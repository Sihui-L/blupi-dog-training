"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Accordion,
  Text,
  Stack,
  Group,
  Button,
  Badge,
  Loader,
} from "@mantine/core";
import PageHeader from "../../components/common/PageHeader";
import BookingForm from "../../components/booking/BookingForm";

interface Service {
  id: string;
  name: string;
  description: any;
  price: number;
  currency: string;
  duration: number;
  type: "private" | "group" | "workshop";
  image?: any;
  isActive: boolean;
  maxParticipants?: number;
  scheduledDate?: string;
  location?: string;
}

interface AvailabilityInfo {
  available: boolean;
  spotsLeft: number;
  maxParticipants: number;
  reason: string;
}

const renderDescription = (description: any) => {
  if (typeof description === "string") {
    return (
      <Text size="sm" c="gray.7">
        {description}
      </Text>
    );
  }

  if (description && Array.isArray(description)) {
    return description.map((block: any, index: number) => {
      if (block.children) {
        return block.children.map((child: any, childIndex: number) => (
          <Text key={`${index}-${childIndex}`} size="sm" c="gray.7">
            {child.text || ""}
          </Text>
        ));
      }
      return null;
    });
  }

  return (
    <Text size="sm" c="gray.7">
      Intensive workshop focusing on specific training topics and techniques.
    </Text>
  );
};

export default function WorkshopPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<Record<string, AvailabilityInfo>>({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services/workshop");
        if (response.ok) {
          const data = await response.json();
          const serviceList = data.services || [];
          setServices(serviceList);
          
          // Fetch availability for each service
          const availabilityPromises = serviceList.map(async (service: Service) => {
            try {
              const availResponse = await fetch(`/api/services/availability/${service.id}`);
              if (availResponse.ok) {
                const availData = await availResponse.json();
                return { serviceId: service.id, availability: availData };
              }
            } catch (error) {
              console.error(`Error fetching availability for service ${service.id}:`, error);
            }
            return { serviceId: service.id, availability: { available: false, reason: "Error checking availability", spotsLeft: 0, maxParticipants: 0 } };
          });
          
          const availabilityResults = await Promise.all(availabilityPromises);
          const availabilityMap: Record<string, AvailabilityInfo> = {};
          
          availabilityResults.forEach(result => {
            availabilityMap[result.serviceId] = result.availability;
          });
          
          setAvailabilityData(availabilityMap);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Workshop"
        subtitle="Don't let minor concerns escalate into expensive issues. We're here for your pet as much as you need us to be, so your best friends can live their longest, healthiest lives."
      />

      <Container size="md" pb={80}>
        <Stack gap="xl">
          {/* Who is this class for section */}
          <Stack gap="lg" align="center">
            <Text size="xl" fw={600} ta="center" c="gray.8">
              Who is this class for?
            </Text>
            <Group justify="center" gap="md">
              <Text ta="center" size="sm" c="gray.7">
                •
              </Text>
              <Text ta="center" size="sm" c="gray.7">
                •
              </Text>
              <Text ta="center" size="sm" c="gray.7">
                •
              </Text>
            </Group>
          </Stack>

          {/* Services Accordion */}
          {loading ? (
            <Stack align="center" gap="md">
              <Loader color="green" />
              <Text size="sm" c="gray.6">
                Loading workshops...
              </Text>
            </Stack>
          ) : services.length === 0 ? (
            <Text ta="center" size="lg" c="gray.7" mt="xl">
              Workshops will be displayed here once they are added via the admin
              panel.
            </Text>
          ) : (
            <Accordion variant="separated" radius="md">
              {services.map((service, index) => (
                <Accordion.Item
                  key={service.id || index}
                  value={String(service.id || index)}
                >
                  <Accordion.Control>
                    <Group justify="space-between" w="100%">
                      <Stack gap={2}>
                        <Group gap="md">
                          <Text fw={500} size="md">
                            {service.name}
                          </Text>
                          <Badge color="orange" variant="light" size="sm">
                            Workshop
                          </Badge>
                        </Group>
                        <Text size="sm" c="gray.6">
                          Duration: {service.duration} minutes
                          {service.maxParticipants &&
                            ` • Max: ${service.maxParticipants} participants`}
                          {service.scheduledDate && ` • ${new Date(service.scheduledDate).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })}`}
                          {service.location && ` • ${service.location}`}
                        </Text>
                      </Stack>
                      <Text fw={600} size="lg" c="green.9">
                        £{service.price}
                      </Text>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="md">
                      <div>{renderDescription(service.description)}</div>
                      
                      {(service.scheduledDate || service.location) && (
                        <Group gap="xl">
                          {service.scheduledDate && (
                            <Text size="sm" c="gray.7">
                              📅 <Text component="span" fw={500}>{new Date(service.scheduledDate).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
                            </Text>
                          )}
                          {service.location && (
                            <Text size="sm" c="gray.7">
                              📍 <Text component="span" fw={500}>{service.location}</Text>
                            </Text>
                          )}
                        </Group>
                      )}

                      <Group justify="space-between" align="center">
                        <Group>
                          {availabilityData[service.id] && (
                            <Text 
                              size="sm" 
                              c={availabilityData[service.id].available ? "green" : "red"}
                              fw={500}
                            >
                              {availabilityData[service.id].available 
                                ? `✅ ${availabilityData[service.id].spotsLeft} spots left`
                                : `❌ ${availabilityData[service.id].reason}`
                              }
                            </Text>
                          )}
                        </Group>
                        
                        <Button
                          variant="filled"
                          className="bg-green-900 hover:bg-green-800 text-white"
                          size="sm"
                          onClick={() => handleBookNow(service)}
                          disabled={availabilityData[service.id] && !availabilityData[service.id].available}
                        >
                          {availabilityData[service.id] && !availabilityData[service.id].available 
                            ? "Fully Booked" 
                            : "Book Now"
                          }
                        </Button>
                      </Group>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Stack>
      </Container>

      <BookingForm
        service={selectedService}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        availabilityInfo={selectedService ? availabilityData[selectedService.id] : undefined}
      />
    </>
  );
}
