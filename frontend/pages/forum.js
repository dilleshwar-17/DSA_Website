import { useState } from 'react'
import Navbar from '../components/ui/Navbar'
import { FaHeart, FaComment, FaShare, FaTags } from 'react-icons/fa'

const dummyPosts = [
  {
    id: 1,
    title: 'Google Interview Experience 2024 - Software Engineer II',
    author: 'CodeNinja99',
    tags: ['Interview Experience', 'Google', 'Offer'],
    content: "I recently finished the rounds for L4 at Google. The rounds consisted of 4 coding interviews and 1 Googliness & Leadership round. For the coding rounds, heavily focus on Graphs and Dynamic Programming. I was asked a variation of Word Ladder and Course Schedule...",
    likes: 432,
    comments: 45,
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'How to transition from Leetcode Medium to Leetcode Hard?',
    author: 'AlgoLearner',
    tags: ['Discussion', 'Strategy'],
    content: "I can comfortably solve most Medium problems in 20-30 minutes, but Hards completely stump me. Should I memorize more patterns or just read the editorials? Any tips would be appreciated.",
    likes: 125,
    comments: 32,
    time: '5 hours ago'
  },
  {
    id: 3,
    title: 'Microsoft SDE Intern OA Questions (September 2024)',
    author: 'StudentCoder',
    tags: ['Online Assessment', 'Microsoft'],
    content: "Just took the Microsoft OA. They asked two questions: 1. A string manipulation question related to minimum deletions. 2. A graph traversal question to find connected components. Both were medium difficulty.",
    likes: 310,
    comments: 89,
    time: '1 day ago'
  },
  {
    id: 4,
    title: 'System Design: Designing a URL Shortener like TinyURL',
    author: 'SystemArchitect',
    tags: ['System Design', 'Architecture'],
    content: "Let's break down how to design a URL shortener that scales to millions of users. We need to discuss DB choices, hashing algorithms (Base62), and caching strategies...",
    likes: 540,
    comments: 120,
    time: '2 days ago'
  }
]

export default function Forum({ darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('hot')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Community Discuss</h1>
          <button className="btn-primary">New Post</button>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="flex gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Search topics, tags, or authors..." 
                className="flex-1 px-4 py-2 rounded-lg border dark:bg-dark-light focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="flex bg-gray-100 dark:bg-dark-light rounded-lg p-1">
                {['hot', 'new', 'top'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1 rounded-md capitalize ${activeTab === tab ? 'bg-white dark:bg-dark shadow text-primary font-semibold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {dummyPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.tags.join(' ').toLowerCase().includes(searchQuery.toLowerCase())).map(post => (
                <div key={post.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold hover:text-primary transition-colors">{post.title}</h2>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{post.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{post.author}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.content}
                  </p>

                  <div className="flex justify-between items-center border-t dark:border-gray-700 pt-3">
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full flex items-center gap-1">
                          <FaTags size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 text-gray-500 dark:text-gray-400 text-sm">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <FaHeart /> {post.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <FaComment /> {post.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <FaShare /> Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="card sticky top-20">
              <h3 className="font-bold text-lg mb-4 border-b dark:border-gray-700 pb-2">Trending Tags</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Google', 'Interview Experience', 'Dynamic Programming', 'Microsoft', 'System Design', 'Online Assessment'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-bold text-lg mb-4 border-b dark:border-gray-700 pb-2">Top Contributors</h3>
              <div className="space-y-3">
                {['algo_master', 'code_ninja', 'graph_wizard'].map((user, i) => (
                  <div key={user} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold">
                        {user.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold">{user}</span>
                    </div>
                    <span className="text-xs text-green-500 font-bold">+{Math.floor(Math.random() * 500) + 100} rep</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
