import React from 'react';
import { Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Xalori
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Stay informed with the latest news, insights, and stories from around the world. 
              Join our community of readers and never miss an important update.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to get the latest articles delivered to your inbox.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Xalori. All rights reserved. Built with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}