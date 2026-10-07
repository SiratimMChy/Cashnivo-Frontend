import { Link } from 'react-router';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-base-100 px-4 py-8 lg:px-10 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-bold">
                        Cashnivo
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-base-content mt-2">
                        About Us
                    </h1>
                    <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
                        Learn more about Cashnivo, your smart expense tracking companion.
                    </p>
                </div>

                {/* Content */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* What is Cashnivo */}
                    <div className="card bg-base-200 border border-base-content/10 shadow-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">What is Cashnivo?</h2>
                        <p className="text-base-content/70 leading-relaxed">
                            Cashnivo is a personal finance tracker built to help you and your family take control of your money without the stress. 
                            Beyond just logging your daily expenses and incomes, you get a friendly, built-in AI Financial Advisor that acts like a real human chatting with you, analyzing your spending habits, and giving you personalized advice to help you reach your goals.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="card bg-base-200 border border-base-content/10 shadow-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                        <ul className="list-disc list-inside space-y-2 text-base-content/70">
                            <li>Get personalized insights from our Smart AI Financial Advisor</li>
                            <li>Track expenses and incomes in real-time</li>
                            <li>Easily log your daily expenses and income on the go</li>
                            <li>Create custom categories that actually match your lifestyle</li>
                            <li>See exactly where your money goes with beautiful, easy-to-read charts</li>
                            <li>Keep your personal financial data completely safe and secure</li>
                            <li>Works perfectly on your phone, tablet, or computer</li>
                        </ul>
                    </div>

                    {/* Our Mission */}
                    <div className="card bg-base-200 border border-base-content/10 shadow-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-base-content/70 leading-relaxed">
                            Our mission is to empower users with financial awareness through simple, powerful tools. 
                            We believe everyone deserves control over their money, and we're here to make that possible.
                        </p>
                    </div>

                    {/* Try Other Features */}
                    <div className="card bg-base-200 border border-base-content/10 shadow-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">Try Other Features</h2>
                        <p className="text-base-content/70 leading-relaxed mb-4">
                            Explore Cashnivo's full suite of tools to manage your budget, track spending trends, and stay financially organized.
                        </p>
                        <Link
                            to="/"
                            className="btn bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-none"
                        >
                            Explore Features
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;