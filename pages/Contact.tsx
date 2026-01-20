
import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Let's Connect</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have questions about our products or need help with an order? Our support team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Us</p>
                    <p className="font-bold">hello@solematecare.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call Support</p>
                    <p className="font-bold">+91 91560 18277</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Headquarters</p>
                    <p className="font-bold">Nashik, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
              <MessageSquare className="mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-indigo-100 text-sm mb-6">
                Our average response time for live chat is under 2 minutes during business hours.
              </p>
              <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-50 transition">
                Start Chatting
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              {submitted ? (
                <div className="text-center py-20 space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto">
                    <Send size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">Message Received!</h2>
                  <p className="text-gray-500">
                    Thank you for reaching out. We've received your query and will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Subject</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Order Query / Feedback" 
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Your Message</label>
                    <textarea 
                      required
                      rows={6} 
                      placeholder="Tell us how we can help you..." 
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition resize-none"
                    ></textarea>
                  </div>
                  <button className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 flex items-center justify-center space-x-2">
                    <span>Send Message</span>
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
