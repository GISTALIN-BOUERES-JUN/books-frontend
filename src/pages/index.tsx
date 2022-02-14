import { Box, Flex, Heading, Button, Icon, Table, Thead, Th, Td, Tr, Checkbox, Tbody, Text, Input, FormControl} from "@chakra-ui/react";
import { RiAddLine, RiDeleteBinLine, RiEditFill } from "react-icons/ri";
import { useEffect, useState, FormEvent } from "react";
import { Header } from "../components/Header";
import Modal from 'react-modal';
import { Sidebar } from "../components/Sidebar";
import { api } from "../services/api";



export default function BookList() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    function handleOpenModal() {
        setIsModalOpen(true);

    }

    function handleCloseModal() {
        setIsModalOpen(false)

    }

    function handleEditOpenModal() {
      setIsEditModalOpen(true);

  }

  function handleEditCloseModal() {
    setIsEditModalOpen(false)

  }

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        api.get('books')
            .then(response => setBookList(response.data))
    }, []);

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState('')
    const [ISBN, setIsbn] = useState('')

    function handleCreateNewBook(event: FormEvent) {
        event.preventDefault();

        const book = {
            name,
            author,
            year,
            ISBN,
        };

        createNewBook(book);
        setName('');
        setAuthor('');
        setYear('');
        setIsbn('');
        handleCloseModal();
    }

    function createNewBook(data) {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:4000/books', requestOptions)
    .then(response => response.json())
    .then(data => setBookList(data));
    }

    const edtBook = {
      name,
      author,
      year,
      ISBN,
  };

    function editedBook(book) {
      edtBook.name = book.name;
      edtBook.author = book.author;
      edtBook.year = book.year;
      edtBook.ISBN = book.ISBN;
      setName(edtBook.name);
      setAuthor(edtBook.author);
      setYear(edtBook.year);
      setIsbn(edtBook.ISBN);
      handleEditOpenModal();

    }


    function handleEditBook(event: FormEvent) {
      event.preventDefault();

      editBook(edtBook);
      setName('');
      setAuthor('');
      setYear('');
      setIsbn('');
      handleEditCloseModal();
  }

    function editBook(data) {

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

      fetch(('http://localhost:4000/books/'+data.ISBN), requestOptions)
      .then(response => response.json())
      .then(data => setBookList(data));


    }

    function deleteBook(id) {

      fetch(('http://localhost:4000/books/'+id), { method: 'DELETE' })
      .then(response => response.json())
      .then(data => setBookList(data));

    }

    return (

        <Box>
            <Header />

            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} overlayClassName="react-modal-overlay" className="react-modal_content">
                <Box flex="1" borderRadius={8}  p="8" bg="#e7e9ee" alignContent="center">
                    <Text fontSize="3xl" color="black">Create New Book</Text>
                    <Input placeholder="Name" mb="2" color="black" value={name} onChange={event => setName(event.target.value)} ></Input>
                    <Input placeholder="Author" mb="2" color="black" value={author} onChange={event => setAuthor(event.target.value)} ></Input>
                        <Input placeholder="Release Year" type="email" mb="2" color="black" value={year} onChange={event => setYear(event.target.value)} ></Input>

                    <Input placeholder="ISBN Number" type="number" mb="4" color="black" value={ISBN} onChange={event => setIsbn(event.target.value)}></Input>
                    <Flex mb="8" justify="space-between" align="center">
                    <Button type="submit" colorScheme="pink" onClick={handleCreateNewBook}> Create New Book </Button>
                    <Button type="submit" colorScheme="pink" onClick={handleCloseModal}> Cancel </Button>
                    </Flex>          
      
                </Box>
            </Modal>

            <Modal isOpen={isEditModalOpen} onRequestClose={handleCloseModal} overlayClassName="react-modal-overlay" className="react-modal_content">
                <Box flex="1" borderRadius={8}  p="8" bg="#e7e9ee" alignContent="center">
                    <Text fontSize="3xl" color="black">Edit Book</Text>
                    <Input placeholder={name} mb="2" color="black" value={name} onChange={event => setName(event.target.value)} ></Input>
                    <Input placeholder={author} mb="2" color="black" value={author} onChange={event => setAuthor(event.target.value)} ></Input>
                        <Input placeholder={year} type="email" mb="2" color="black" value={year} onChange={event => setYear(event.target.value)} ></Input>

                    <Input placeholder={ISBN} type="number" mb="4" color="black" value={ISBN} onChange={event => setIsbn(event.target.value)}></Input>
                    <Flex mb="8" justify="space-between" align="center">
                    <Button type="submit" colorScheme="pink" onClick={handleEditBook}> Edit Book </Button>
                    <Button type="submit" colorScheme="pink" onClick={handleEditCloseModal}> Cancel </Button>
                    </Flex>          
      
                </Box>
            </Modal>



            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Book List APP</Heading>
                        <Button onClick={handleOpenModal} size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} />}> Create New </Button>
                    </Flex>

                    <Table colorScheme="WhiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px="6" color="gray.300" width="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>

                                <Th>Name</Th>
                                <Th>Author</Th>
                                <Th>Year</Th>
                                <Th>ISBN Number</Th>
                                <Th width="8"></Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {bookList.map(book => {
                                return (
                                    <Tr key={book.id} >
                                        <Td px="6">
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Text fontSize="sm" color="gray.300"> {book.name} </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize="sm" color="gray.300"> {book.author} </Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize="sm" color="gray.300"> {book.year}</Text>
                                        </Td>
                                        <Td>
                                            <Text fontSize="sm" color="gray.300"> {book.ISBN} </Text>
                                        </Td>
                                        <Td>
                                            <Button onClick={()=> editedBook(book)} size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiEditFill} />}> Edit </Button>
                                        </Td>
                                        <Td>
                                            <Button onClick={()=> deleteBook(book.ISBN)} size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiDeleteBinLine} />}> Delete </Button>
                                        </Td>

                                    </Tr>
                                )
                            })}


                        </Tbody>
                    </Table>


                </Box>
            </Flex>

        </Box>
    );

}