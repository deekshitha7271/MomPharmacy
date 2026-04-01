import { useParams } from 'react-router-dom';
import { HelpCircle, ShieldCheck, FileText, RefreshCw } from 'lucide-react';

const Support = () => {
    const { type } = useParams();

    const getContent = () => {
        switch (type) {
            case 'how-to-order':
                return {
                    title: "How to Order",
                    icon: <HelpCircle className="text-teal-600" size={48} />,
                    description: "Ordering medicines with Mom Pharmacy is simple and secure.",
                    steps: [
                        "Search for your required medicine using the search bar.",
                        "Add the medicines to your cart after checking details.",
                        "Upload a valid prescription if required for the medicine.",
                        "Proceed to checkout and enter your delivery address.",
                        "Choose your payment method and confirm the order.",
                        "Relax while we deliver your health needs just like Mom would!"
                    ]
                };
            case 'terms':
                return {
                    title: "Terms of Service",
                    icon: <FileText className="text-blue-600" size={48} />,
                    description: "Please read our terms of service carefully before using our platform.",
                    content: "By accessing Mom Pharmacy, you agree to comply with our usage policies. We provide authentic medications but require valid prescriptions for regulated drugs. Users must provide accurate information for delivery and billing. We reserve the right to cancel orders in case of stock unavailability or suspicious activity."
                };
            case 'privacy':
                return {
                    title: "Privacy Policy",
                    icon: <ShieldCheck className="text-green-600" size={48} />,
                    description: "Your privacy is our priority. We protect your data with care.",
                    content: "Mom Pharmacy collects only necessary information to process your orders and improve our service. Your health records and prescriptions are encrypted and never shared with unauthorized third parties. We use industry-standard security protocols to ensure your data stays safe."
                };
            case 'refund-policy':
                return {
                    title: "Refund Policy",
                    icon: <RefreshCw className="text-orange-600" size={48} />,
                    description: "Fair and transparent refund process for your peace of mind.",
                    content: "Refunds are processed if the medicine delivered is damaged, expired, or incorrect. Please initiate a refund request within 48 hours of delivery. Once verified, the refund will be credited to your original payment method within 5-7 business days."
                };
            default:
                return {
                    title: "Support Center",
                    icon: <HelpCircle className="text-gray-600" size={48} />,
                    description: "How can we help you today?",
                    content: "Please select a topic from the footer or contact our support team at hr@mompharmacy.com"
                };
        }
    };

    const { title, icon, description, steps, content } = getContent();

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-teal-50">
                <div className="bg-teal-50 p-10 flex flex-col items-center text-center border-b border-teal-100">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                        {icon}
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{title}</h1>
                    <p className="text-gray-600 text-lg max-w-2xl">{description}</p>
                </div>

                <div className="p-10">
                    {steps ? (
                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-4 items-start">
                                    <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 text-lg pt-0.5">{step}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {content}
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                        <p className="text-gray-500 mb-6">Still have questions? We're here to help.</p>
                        <a
                            href="https://www.linkedin.com/company/mompharmacy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-100"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
