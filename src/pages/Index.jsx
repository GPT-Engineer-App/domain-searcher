import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, Spinner, Image, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const toast = useToast();

  const handleSearch = async () => {
    if (!domain) {
      toast({
        title: "Please enter a domain",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.example.com/domain/${domain}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Domain Search
        </Heading>
        <HStack>
          <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter a domain (e.g., example.com)" />
          <Button onClick={handleSearch} colorScheme="blue" leftIcon={<FaSearch />} isLoading={loading}>
            Search
          </Button>
        </HStack>
        {loading ? (
          <Spinner size="xl" />
        ) : data ? (
          <Box borderWidth={1} borderRadius="md" padding={4}>
            <Heading as="h2" size="lg" marginBottom={4}>
              {data.domain}
            </Heading>
            <Image src="https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3MTI2NzIwMjl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt={data.domain} marginBottom={4} />
            <Text>
              <strong>Registrar:</strong> {data.registrar}
            </Text>
            <Text>
              <strong>Creation Date:</strong> {data.creationDate}
            </Text>
            <Text>
              <strong>Expiration Date:</strong> {data.expirationDate}
            </Text>
          </Box>
        ) : (
          <Text textAlign="center">Enter a domain and click search to get information.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
