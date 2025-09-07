import React from "react";
import { Container, Title, Text, Stack, Card } from "@mantine/core";
import PageHeader from "../components/common/PageHeader";

export default function FAQPage() {
  const faqs = [
    {
      question: "How long does dog training take?",
      answer: "The duration of training varies depending on your dog's age, breed, and the specific behaviors being addressed. Basic obedience training typically takes 4-8 weeks, while more complex behavioral issues may require 3-6 months of consistent work."
    },
    {
      question: "What age should I start training my puppy?",
      answer: "Puppies can start basic training as early as 8 weeks old. Early socialization and basic commands are crucial during the 8-16 week period. However, it's never too late to start training - adult dogs can learn new behaviors at any age."
    },
    {
      question: "Do you offer in-home training sessions?",
      answer: "Yes, we offer in-home private training sessions. This allows us to work with your dog in their familiar environment and address specific household behaviors. We also offer group classes at our training facility."
    },
    {
      question: "What training methods do you use?",
      answer: "We use positive reinforcement training methods based on modern animal behavior science. This includes reward-based training, clicker training, and behavior modification techniques that focus on building trust and communication between you and your dog."
    },
    {
      question: "Can you help with aggressive dogs?",
      answer: "Yes, we work with dogs displaying aggressive behaviors. However, we always recommend a veterinary consultation first to rule out any medical causes. Our ABTC certified trainers have experience with reactivity and aggression cases."
    },
    {
      question: "What should I bring to the first training session?",
      answer: "Please bring your dog on a comfortable collar or harness with a standard leash, some high-value treats your dog loves, any training tools you currently use, and a list of specific behaviors you'd like to address."
    },
    {
      question: "Do you offer group classes?",
      answer: "Yes, we offer group classes for basic obedience, puppy socialization, and specialized workshops. Group classes are a great way for dogs to learn social skills while practicing commands around distractions."
    },
    {
      question: "What happens if I miss a training session?",
      answer: "We understand that life happens. Please give us at least 24 hours notice to reschedule. Sessions canceled with less than 24 hours notice may incur a cancellation fee."
    },
    {
      question: "Will my dog be trained to work with other family members?",
      answer: "Absolutely! We encourage all family members to participate in training sessions when possible. We'll teach everyone the same commands and techniques to ensure consistency and help your dog generalize their training."
    },
    {
      question: "How much does training cost?",
      answer: "Our pricing varies depending on the type of service. Private sessions start from £75, group classes from £45, and workshops from £35. We offer package deals for multiple sessions. Contact us for a detailed quote based on your specific needs."
    },
    {
      question: "What if my dog doesn't respond to training?",
      answer: "Every dog learns at their own pace. We'll adjust our approach based on your dog's learning style and motivation. If progress is slower than expected, we may recommend additional sessions or refer you to a veterinary behaviorist if needed."
    },
    {
      question: "Do you provide ongoing support after training?",
      answer: "Yes! We provide follow-up support via phone and email for all our clients. We want to ensure your dog's training success continues long after our sessions end."
    }
  ];

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our dog training services"
      />
      
      <Container size="md" py={60}>
        <Stack gap="xl">
          <Text size="lg" c="dimmed" ta="center">
            {"Can't find the answer you're looking for? Feel free to"}{" "}
            <Text component="a" href="/contact" c="green" fw={600}>
              contact us
            </Text>{" "}
            {"and we'll be happy to help."}
          </Text>

          <Stack gap="md">
            {faqs.map((faq, index) => (
              <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="sm">
                  <Text fw={600} size="md" c="dark">
                    {faq.question}
                  </Text>
                  <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                    {faq.answer}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Stack>

          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <Title order={3} size="h4" mb="md" ta="center">
              Still Have Questions?
            </Title>
            <Text ta="center" c="dimmed" mb="md">
              {"We're here to help! Reach out to us for personalized answers about your dog's training needs."}
            </Text>
            <Text ta="center">
              <Text component="a" href="/contact" c="green" fw={600} size="lg">
                Contact Us Today →
              </Text>
            </Text>
          </div>
        </Stack>
      </Container>
    </div>
  );
}