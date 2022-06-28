import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers,faStepBackward,faFastBackward,faStepForward,faFastForward} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styled from "styled-components";
import {FaSearch} from "react-icons/fa";


const HandleTable = () => {

  const [users,setUsers] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [usersPerPage,setUsersPerPage]= useState(5);

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = users!==null ? users.slice(firstIndex,lastIndex) : [];
  const totalPages = users!==null ? Math.ceil(users.length / usersPerPage) : 1;


  const changePage = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    })
  }

  const firstPage = () => {
    if ( currentPage > 1){
      setCurrentPage(()=>1)
    }
  }

  const prevPage = () => {
    if ( currentPage > 1){
     setCurrentPage((prev)=>prev-1)
    }
  }

  const lastPage = () => {
    if ( currentPage < Math.ceil( users.length /  usersPerPage)){
        setCurrentPage(() => Math.ceil(users.length /  usersPerPage));
    }
  }

  const nextPage = () => {
    if ( currentPage < Math.ceil( users.length /  usersPerPage)){
        setCurrentPage((prev)=>prev + 1);
    }
  }

  const  fetchData = async () => {
    await axios.get("http://localhost:8081/api/v1/desktop/user/search/?keyword="+query)
      .then(res => {

        console.log(res.data);
        console.log(res.data.message);
        console.log(res.data.obj);
        console.log(data,`new data `);

        let datas = res.data.obj;
        console.log(datas,"datas-------------- ");
        if (datas!==null)
        setUsers( () => res.data.obj);
      })
  };
  useEffect( () => {
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  return (
    <Container>
      <Card >
        <CardHeader>
          <HeaderWrapper>
            <HeaderTitle>
              <IconWrapper>
                <FontAwesomeIcon icon={faUsers} />
              </IconWrapper>
              User List
            </HeaderTitle>
            <SearchWrapper>
              <Input type={"text"}
                  id={"search"}
                  placeholder={"Search..."}
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
              <Label htmlFor={"search"}><FaSearch /></Label>
            </SearchWrapper>
          </HeaderWrapper>
        </CardHeader>
        <CardBody>
          <Table>
            <Thead>
              <tr>
                <td>T-r</td>
                <td>Full Name</td>
                <td>Login</td>
                <td>Passport</td>
                <td>Role</td>
              </tr>
            </Thead>
            <Tbody>
            {users===null ?
              <tr>
                <td colSpan={6}>No Users Available</td>
              </tr> :
              currentUsers.map((user,index) =>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.login}</td>
                  <td>{user.passport}</td>
                  <td>{user.roleName}</td>
                </tr>
              ))
            }
            </Tbody>
          </Table>
        </CardBody>

        {users.length === 0 ? null :
          <CardFooter>
            <FooterSection section={"left"}>
              Showing Page {currentPage} of {totalPages}
            </FooterSection>
            <FooterSection  section={"right"}>
              <InputGroup size={"sm"}>

                <Button
                  type={"button"}
                  disabled={currentPage === 1}
                  bg={currentPage === 1 ? "lightgray":"#fff"}
                  onClick={firstPage}
                  mr={true}
                >
                  <FontAwesomeIcon icon={faFastBackward} /> First
                </Button>
                <Button
                  type={"button"} variant={"outline-info"}
                  disabled={currentPage === 1}
                  bg={currentPage === 1 ? "lightgray":"#fff"}
                  onClick={prevPage}
                >
                  <FontAwesomeIcon icon={faStepBackward} /> Prev
                </Button>
                  <Page>{currentPage}</Page>
                <Button
                  type={"button"} variant={"outline-info"}
                  disabled={currentPage === totalPages}
                  bg={currentPage === totalPages ? "lightgray":"#fff"}
                  onClick={nextPage}
                  mr={true}
                >
                  <FontAwesomeIcon icon={faStepForward} /> Next
                </Button>
                <Button
                  type={"button"} variant={"outline-info"}
                  disabled={currentPage === totalPages}
                  bg={currentPage === totalPages ? "lightgray":"#fff"}
                  onClick={lastPage}
                >
                  <FontAwesomeIcon icon={faFastForward} /> Last
                </Button>

              </InputGroup>
            </FooterSection>
          </CardFooter>}
      </Card>
    </Container>
  );
};

const Tbody = styled.tbody` 

  tr {
    margin-bottom: 5px!important;
  }
  td {
    align-items: center;
    border-top: 0.1px solid #ACE2FFDA;
    padding-left: 10px!important;
    height: 60px;
  }
`;

const Thead = styled.thead`
  td {
    padding-left: 10px!important;
    margin-bottom: 5px!important;
    border-top: 0.1px solid #ACE2FFDA;
    height: 60px;
  }
`;

const Table = styled.table`
  width: 100%; 
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  color: #0096DB;
`;

const Input = styled.input.attrs((props)=>({type: `${props.type}`}))`
  width: 150px;
  border: none;
  height: 30px;
  
  &:focus{
    outline: none;
  }
  &::placeholder{
    color: lightgray;
    letter-spacing: 1px;
    font-size: 14px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  border: 1px solid #89CFF5;
  background-color: #fff;
  border-radius: 10px;
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #E9F3FF;
  color: #0096DB;
  padding: 5px 8px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const CardBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 10px;
  background-color: #E9F3FF;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const Card = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 0.1px solid #43B5F4;
  border-radius: 10px;
`;

const Page = styled.span`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 20px;
  color: #282c34;
`;

const Button = styled.button`
  width: 60px;
  border: 0.1px solid #43B5F4;
  transition: all 0.4s ease;
  border-radius: 5px;
  background-color: ${props => props.bg};
  margin-right: ${props =>props.mr ? "5px": null};
  color: #43B5F4;
  
  &:focus{
    outline: none;
    transform: scale(0.9);
  }
`;

const InputGroup = styled.span`
  width: 300px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #43B5F4;
`;

const FooterSection = styled.div`
  float: ${props => props.section};
  font-weight: 600;
  color: #43B5F4;
`;

const IconWrapper = styled.span`
  display: flex;
  margin-right: 10px;
`;

const HeaderTitle = styled.span`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #000;
`;

const HeaderWrapper = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export default HandleTable;