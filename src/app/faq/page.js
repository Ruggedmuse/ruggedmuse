"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "What products do you manufacture?",
      answer:
        "We specialize in custom manufacturing of sportswear, fitness wear, casual wear, sublimation wear, martial arts uniforms, and gloves.",
    },
    {
      question: "Do you offer custom designs and private labeling?",
      answer:
        "Yes, we offer complete OEM and private label services, including custom logos, tags, packaging, and designs tailored to your brand.",
    },
    {
      question: "What is the minimum order quantity (MOQ)?",
      answer:
        "Our minimum order quantity varies by product type, but generally starts from 50 to 100 pieces per design.",
    },
    {
      question: "How do I place an order?",
      answer:
        "You can place an inquiry through the website or message our team. We will respond promptly.",
    },
    {
      question: "Can I order a sample before bulk production?",
      answer:
        "Yes, we can create a sample for approval before starting bulk production. Sample charges may apply.",
    },
    {
      question: "What are your payment terms?",
      answer:
        "We require 50% advance payment and the balance before shipment. We accept bank transfers and secure methods.",
    },
    {
      question: "How long does production take?",
      answer:
        "Production time depends on order size and customization, usually 3 to 4 weeks after sample approval.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship worldwide via air cargo, sea freight, and couriers like DHL, FedEx, and UPS.",
    },
    {
      question: "Can I change my design after ordering?",
      answer:
        "Minor changes can be made during sampling. After production starts, changes may not be possible.",
    },
    {
      question: "How do you ensure product quality?",
      answer:
        "All items go through rigorous quality checks—from fabric selection to stitching, finishing, and packing.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white spacemono py-16 px-5">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-center text-3xl md:text-4xl mb-3 font-light tracking-wide">
          Frequently Asked <span className="font-normal text-white/60">Questions</span>
        </h2>

        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto text-sm md:text-base">
          Everything you need to know about our manufacturing, ordering, and services.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl bg-zinc-950 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-all"
              >
                <span className="font-medium text-base md:text-lg text-white/90">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-white" size={22} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 py-4 pb-5 text-gray-400 text-sm md:text-base leading-relaxed">
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
