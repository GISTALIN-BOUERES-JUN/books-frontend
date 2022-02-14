import { Box, Text, Stack, Link, Icon } from "@chakra-ui/react";
import { RiArchiveFill, RiContactsLine, RiDeleteBinLine } from "react-icons/ri";

export function Sidebar(){
    return (
        <Box as="aside" w="64" mr="8">
            <Stack spacing="12" align="flex-start">
                <Box>
                    <Text fontWeight="bold" color="gray.400" fontSize="small">Books</Text>
                    <Stack spacing="4" mt="8" align="strech">
                        <Link display="flex" href="/">
                            <Icon as={RiContactsLine} fontSize="20" />
                            <Text ml="4" fontWeight="medium">Books</Text>
                        </Link>

    

                        <Link display="flex" href="/archive">
                            <Icon as={RiArchiveFill} fontSize="20" />
                            <Text ml="4" fontWeight="medium">Archive</Text>
                        </Link>

                        <Link display="flex"  href="junk">
                            <Icon as={RiDeleteBinLine} fontSize="20" />
                            <Text ml="4" fontWeight="medium">Junk</Text>
                        </Link>

                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}