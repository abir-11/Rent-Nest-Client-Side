"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is there any broker fee for booking a room?",
    answer: "No, our platform connects you directly with landlords and verified students. There are zero broker fees or hidden charges."
  },
  {
    question: "How do I contact the property owner?",
    answer: "Once you create an account, you can see the contact details of the landlord on the property details page or message them directly through our chat system."
  },
  {
    question: "Are all the properties verified?",
    answer: "Yes, we manually verify the details and documents of landlords before their properties go live on our platform to ensure your safety."
  },
  {
    question: "Can I list my own room for a roommate?",
    answer: "Absolutely! If you are a student looking for a roommate, you can easily post a listing in the 'Roommates' category."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // প্রথমটি ওপেন থাকবে

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Got Questions?</h2>
          <p className="text-slate-500">Find answers to the most common questions below.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-slate-800 text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-emerald-500 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-500">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}