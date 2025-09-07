import React from "react";
import { Container, Title, Text, Stack, List, ListItem, Divider } from "@mantine/core";
import PageHeader from "../components/common/PageHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Terms and Conditions"
        subtitle="Please read these terms carefully before booking our services"
      />
      
      <Container size="md" py={60}>
        <Stack gap="xl">
          <Text size="sm" c="dimmed" ta="center">
            Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>

          <div>
            <Title order={2} size="h3" mb="md">
              1. Agreement to Terms
            </Title>
            <Text c="dimmed" style={{ lineHeight: 1.6 }}>
              By booking and using our dog training services, you agree to these Terms and Conditions. 
              These terms apply to all services provided by Blupi Dog Training, including private sessions, 
              group classes, workshops, and consultations.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              2. Booking and Payment
            </Title>
            <Stack gap="sm">
              <List withPadding>
                <ListItem>Payment is required in full at the time of booking unless otherwise agreed</ListItem>
                <ListItem>We accept all major credit cards and bank transfers</ListItem>
                <ListItem>Package deals must be paid in full before the first session</ListItem>
                <ListItem>Prices are subject to change with 30 days notice</ListItem>
              </List>
            </Stack>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              3. Cancellation and Rescheduling
            </Title>
            <Stack gap="sm">
              <List withPadding>
                <ListItem>24 hours notice is required for cancellations or rescheduling</ListItem>
                <ListItem>Cancellations with less than 24 hours notice may incur a 50% cancellation fee</ListItem>
                <ListItem>No-shows will be charged the full session fee</ListItem>
                <ListItem>We reserve the right to cancel sessions due to weather or unforeseen circumstances</ListItem>
                <ListItem>Refunds for our cancellations will be processed within 7 business days</ListItem>
              </List>
            </Stack>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              4. Client Responsibilities
            </Title>
            <Stack gap="sm">
              <List withPadding>
                <ListItem>Ensure your dog is up to date with vaccinations and flea/worm treatments</ListItem>
                <ListItem>Inform us of any health issues, behavioral problems, or bite history</ListItem>
                <ListItem>Provide a suitable training environment for in-home sessions</ListItem>
                <ListItem>Attend sessions punctually and be prepared with required equipment</ListItem>
                <ListItem>Practice exercises between sessions as recommended</ListItem>
                <ListItem>Supervise your dog at all times during group classes</ListItem>
              </List>
            </Stack>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              5. Health and Safety
            </Title>
            <Stack gap="sm">
              <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                We prioritize the safety of all dogs and humans in our care. Dogs showing signs of illness 
                will not be admitted to group sessions. We reserve the right to refuse service to dogs 
                displaying dangerous aggressive behavior.
              </Text>
              <List withPadding>
                <ListItem>Dogs must be current on vaccinations (DHPP, Rabies, Bordetella)</ListItem>
                <ListItem>Sick dogs should not attend training sessions</ListItem>
                <ListItem>We may recommend veterinary consultation for behavioral issues</ListItem>
                <ListItem>Emergency veterinary costs are the responsibility of the dog owner</ListItem>
              </List>
            </Stack>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              6. Limitation of Liability
            </Title>
            <Text c="dimmed" style={{ lineHeight: 1.6 }}>
              While we take every precaution to ensure safe training sessions, dog training involves inherent risks. 
              Clients assume responsibility for any injuries to persons or damage to property that may occur during 
              or as a result of training sessions. Our liability is limited to the cost of services provided.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              7. Training Results
            </Title>
            <Text c="dimmed" style={{ lineHeight: 1.6 }}>
              We cannot guarantee specific training outcomes as results depend on many factors including the dog's 
              temperament, age, health, and the owner's consistency in practicing exercises. We will work diligently 
              to help achieve your training goals using proven, positive reinforcement methods.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              8. Privacy and Data Protection
            </Title>
            <Stack gap="sm">
              <List withPadding>
                <ListItem>We collect only necessary information to provide our services</ListItem>
                <ListItem>Your personal information will not be shared with third parties without consent</ListItem>
                <ListItem>We may use photos/videos for marketing with your written permission</ListItem>
                <ListItem>You have the right to request deletion of your personal data</ListItem>
              </List>
            </Stack>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              9. Intellectual Property
            </Title>
            <Text c="dimmed" style={{ lineHeight: 1.6 }}>
              All training materials, methods, and content provided during sessions remain the intellectual 
              property of Blupi Dog Training. Clients may use these materials for personal use with their own dogs 
              but may not redistribute or teach these methods commercially without written permission.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="md">
              10. Dispute Resolution
            </Title>
            <Text c="dimmed" style={{ lineHeight: 1.6 }}>
              We are committed to resolving any concerns promptly and fairly. Please contact us directly to discuss 
              any issues. These terms are governed by the laws of England and Wales. Any disputes will be resolved 
              through the appropriate courts in London.
            </Text>
          </div>

          <Divider my="xl" />

          <div className="bg-blue-50 p-6 rounded-lg">
            <Title order={3} size="h4" mb="md" ta="center">
              Questions About These Terms?
            </Title>
            <Text ta="center" c="dimmed" mb="md">
              If you have any questions about these Terms and Conditions, please don't hesitate to contact us.
            </Text>
            <Text ta="center">
              <Text component="a" href="/contact" c="blue" fw={600} size="lg">
                Contact Us →
              </Text>
            </Text>
          </div>

          <Text size="xs" c="dimmed" ta="center" mt="xl">
            By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </Text>
        </Stack>
      </Container>
    </div>
  );
}