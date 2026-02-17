
export default function PrivacyPolicyPage() {
    return (
        <div className="w-full min-h-screen bg-primary pt-24 pb-12 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl shadow-secondary/5 border border-white/50">
                <h1 className="text-3xl font-bold text-secondary mb-8 pb-4 border-b border-secondary/10">Privacy Policy</h1>

                <div className="space-y-6 text-secondary/80 leading-relaxed">
                    <p className="text-sm text-secondary/50">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-secondary mb-3">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, make a purchase,
                            sign up for our newsletter, or contact us for support. This information may include your name, email address,
                            postal address, phone number, and payment information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-secondary mb-3">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to process your transactions, manage your account, send you order confirmations,
                            respond to your comments and questions, and send you technical notices, updates, security alerts, and support and administrative messages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-secondary mb-3">3. Sharing of Information</h2>
                        <p>
                            We may share your information with third-party vendors, consultants, and other service providers who need access
                            to such information to carry out work on our behalf, such as payment processing, shipping, and data analysis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-secondary mb-3">4. Security</h2>
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access,
                            disclosure, alteration and destruction.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
