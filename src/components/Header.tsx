import { Flex, Text, Input, Icon, HStack, Box, Avatar } from "@chakra-ui/react";
import {  RiSearchLine } from "react-icons/ri";


export function Header() {
    return (
        <Flex as="header" w="100%" maxWidth={1480} h="20" mx="auto" mt="4" px="6" align="center">
            <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
                Books Front End
                <Text as="span" ml="1" color="pink.500">.</Text>
            </Text>

            <Flex
                as="label"
                flex="1"
                py="4"
                px="8"
                ml="6"
                maxWidth={400}
                alignSelf="center"
                color="gray.200"
                position="relative"
                bg="gray.800"
                borderRadius="full"

            >
                <Input
                    color="gray.50"
                    variant="unstyled"
                    px="4"
                    mr="4"
                    placeholder="User Search"
                    _placeholder={{ color: 'gray.400' }}
                />

                <Icon as={RiSearchLine} fontSize="20" />
            </Flex>


            <Flex align="center" ml="auto">
            <HStack spacing="8" mx="8" pr="4" py="1" color="gray.300" borderRightRadius={1} borderColor="gray.700">  
            </HStack>

            <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Geraldo Boueres</Text>
                <Text color="gray.300" fontSize="small">geraldoboueres@gmail.com</Text>
            </Box>
            <Avatar size="md" name="Geraldo Boueres" src="https://github.com/GISTALIN-BOUERES-JUN.png" />
            </Flex>

            </Flex>
        </Flex>

    );
}