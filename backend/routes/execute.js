const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');

// Judge0 Language ID Mappings
const JUDGE0_LANG_IDS = {
    'python': 92,
    'javascript': 93,
    'java': 91,
    'c': 103,
    'cpp': 105,
    'c++': 105
};

router.post('/', async (req, res) => {
    const { code, language } = req.body;

    if (!code || code.trim() === '') {
        return res.status(400).json({ error: 'Code cannot be empty.' });
    }

    // --- CLOUD EXECUTION (JUDGE0) ---
    if (process.env.RAPIDAPI_KEY) {
        try {
            const langId = JUDGE0_LANG_IDS[language.toLowerCase()];
            if (!langId) {
                return res.status(400).json({ error: `Language '${language}' is not supported on Judge0.` });
            }

            const response = await axios.post(
                'https://judge0-extra-ce.p.rapidapi.com/submissions?wait=true',
                {
                    source_code: code,
                    language_id: langId,
                    stdin: ""
                },
                {
                    headers: {
                        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                        'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    }
                }
            );

            const { stdout, stderr, compile_output, message, status } = response.data;
            
            if (status.id > 3) { // Non-successful status
                return res.status(400).json({ 
                    error: stderr || compile_output || message || status.description 
                });
            }

            return res.json({ output: stdout || 'Execution finished successfully (No output)' });

        } catch (err) {
            console.error('Judge0 Error:', err.response?.data || err.message);
            // Fallback to local if cloud fails? Or just return error?
            // For now, let's return error if explicitly configured for cloud
            return res.status(500).json({ error: 'Cloud execution failed or timed out.' });
        }
    }

    // --- LOCAL EXECUTION FALLBACK ---
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const tempDir = path.join(__dirname, '..', 'temp_exec');
    
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    let filePath, command, cleanupFiles = [];

    try {
        if (language === 'python') {
            filePath = path.join(tempDir, `${uniqueId}.py`);
            let finalCode = code;
            if (code.includes('def solve') && !code.includes('solve()')) {
                finalCode += '\n\nsolve()\n';
            }
            fs.writeFileSync(filePath, finalCode);
            const pyCmd = process.platform === 'win32' ? 'python' : 'python3';
            command = `${pyCmd} "${filePath}"`;
            cleanupFiles.push(filePath);
        } 
        else if (language === 'javascript') {
            filePath = path.join(tempDir, `${uniqueId}.js`);
            let finalCode = code;
            if (code.includes('function solve') && !code.includes('solve()')) {
                finalCode += '\n\nsolve();\n';
            }
            fs.writeFileSync(filePath, finalCode);
            command = `node "${filePath}"`;
            cleanupFiles.push(filePath);
        } 
        else if (language === 'c') {
            filePath = path.join(tempDir, `${uniqueId}.c`);
            const exePath = path.join(tempDir, `${uniqueId}.exe`);
            let finalCode = code;
            if (!code.includes('main(')) {
                finalCode += '\n\nint main() {\n    printf("Compiled Successfully!");\n    return 0;\n}\n';
            }
            fs.writeFileSync(filePath, finalCode);
            command = `gcc "${filePath}" -o "${exePath}" && "${exePath}"`;
            cleanupFiles.push(filePath, exePath);
        } 
        else if (language === 'cpp' || language === 'c++') {
            filePath = path.join(tempDir, `${uniqueId}.cpp`);
            const exePath = path.join(tempDir, `${uniqueId}.exe`);
            let finalCode = code;
            if (!code.includes('main(')) {
                finalCode += '\n\nint main() {\n    Solution obj;\n    return 0;\n}\n';
            }
            fs.writeFileSync(filePath, finalCode);
            command = `g++ "${filePath}" -o "${exePath}" && "${exePath}"`;
            cleanupFiles.push(filePath, exePath);
        } 
        else if (language === 'java') {
            const javaDir = path.join(tempDir, uniqueId);
            fs.mkdirSync(javaDir);
            const publicClassMatch = code.match(/public\s+class\s+([a-zA-Z0-9_]+)/);
            const className = publicClassMatch ? publicClassMatch[1] : 'Solution';
            filePath = path.join(javaDir, `${className}.java`);
            let finalCode = code;
            if (!code.includes('public static void main')) {
                if (code.includes(`class ${className} {`)) {
                    finalCode = code.replace(`class ${className} {`, `class ${className} {\n    public static void main(String[] args) {\n        System.out.println("Java Compiled Successfully!");\n    }\n`);
                } else {
                    finalCode = `public class ${className} {\n    public static void main(String[] args) {\n        System.out.println("Java Compiled Successfully!");\n    }\n}\n` + code;
                }
            }
            fs.writeFileSync(filePath, finalCode);
            command = `cd "${javaDir}" && javac ${className}.java && java ${className}`;
            cleanupFiles.push(javaDir);
        } 
        else {
            return res.status(400).json({ error: `Language '${language}' is not supported.` });
        }

        exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
            // Cleanup logic
            cleanupFiles.forEach(file => {
                try {
                    if (fs.existsSync(file)) {
                        if (fs.lstatSync(file).isDirectory()) fs.rmSync(file, { recursive: true, force: true });
                        else fs.unlinkSync(file);
                    }
                } catch (err) { console.error("Cleanup error:", err); }
            });

            if (error) {
                if (error.killed) return res.status(400).json({ error: 'Execution timed out (5s limit).' });
                return res.status(400).json({ error: stderr || error.message });
            }
            res.json({ output: stdout || stderr || 'Execution finished successfully (No output)' });
        });

    } catch (err) {
        console.error('Local Execution Error:', err.message);
        return res.status(500).json({ error: 'Local execution setup failed.' });
    }
});

module.exports = router;

