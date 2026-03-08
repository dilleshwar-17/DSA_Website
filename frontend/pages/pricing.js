import Link from 'next/link'
import Navbar from '../components/ui/Navbar'

export default function Pricing({ darkMode, toggleDarkMode }) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '100 coding problems',
        '50 visualizations',
        'Basic code playground',
        'Community access',
        'Progress tracking'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$15',
      period: 'per month',
      features: [
        '500+ coding problems',
        '200+ visualizations',
        'Advanced code playground',
        'Priority support',
        'Interview prep materials',
        'Mock interviews',
        'Detailed analytics'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Everything in Pro',
        'Custom problem sets',
        'Team management',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'Training sessions'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`card relative ${plan.popular ? 'border-2 border-primary' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400"> / {plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/signup"
                className={`block text-center py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
