import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InfiniteScroll from "react-infinite-scroll-component";
const Employees = () => {
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);

  const [employees, setEmployees] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(0);

  React.useEffect(() => {
    const getEmployees = async (index) => {
      const response = await axios.get(
        "http://localhost:5000/api/employees?page=0",
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log(response.data.employees);
        setEmployees(response.data.employees);
        setTotalPages(response.data.totalPages);
      } else {
        console.log("erreur");
      }
    };
    getEmployees(0);
  }, []);
  const appendEmployees = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/employees?page=${index}`,
      { withCredentials: true }
    );
    const temp = [...employees];
    const loadedData = response.data.employees;
    const appended = temp.concat(loadedData);
    setEmployees(appended);
  };
  React.useEffect(() => {
    if (index !== 0) {
      appendEmployees();
    }
  }, [index]);

  const fetchData = async () => {
    setIndex((prev) => prev + 1);
  };

  return (
<div className='w-4/5 my-16 mx-auto'>
<div style={{ overflow: "auto" }} id="scrollableDiv" >
<Button className='mb-4' onClick={() => navigate('/dashboard/employees/create')} >Ajouter un employé</Button>
  <InfiniteScroll
    dataLength={
      employees && employees.length > 0 ? employees.length : 6
    } 
    next={fetchData}
    hasMore={true}
    scrollableTarget="scrollableDiv"
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
  >
      <Table>
      <TableCaption>A list of Employees</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">N°</TableHead>
          <TableHead>Nom Complet</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Post</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      
      {employees.map((employee, index) => (
        <TableRow key={employee._id}>
        <TableCell className="font-medium">{index+1}</TableCell>
        <TableCell>{`${employee.nom} ${employee.prenom}`}</TableCell>
        <TableCell>{employee.email}</TableCell>
        <TableCell>{employee.post}</TableCell>
        <TableCell className=" flex gap-3 text-right justify-end">
          <Link className='text-blue-500' to={`/dashboard/employees/details/${employee._id}`}>
            <FaInfoCircle  size={24} />
          </Link>
          <Link className='text-green-500' to={`/dashboard/employees/edit/${employee._id}`}>
            <FaUserEdit size={24} />
            </Link>
          <Link className='text-red-500' to={`/dashboard/employees/delete/${employee._id}`}>
            <MdDelete size={24} />
          </Link>
          
        </TableCell>
      </TableRow>
      ))}
      </TableBody>
    </Table>
  </InfiniteScroll>
        <Button
          onClick={() => setIndex((prevIndex) => prevIndex + 1)}
          disabled={index === totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Employees;
