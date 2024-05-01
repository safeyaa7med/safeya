import { useState } from "react";
import {ArrowForwardIcon,ArrowBackIcon} from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import {Button,ButtonGroup,FormControl,FormLabel,Input,Modal,ModalContent,ModalHeader,ModalBody} from "@chakra-ui/react";
import {Box,Flex,Image,Text} from "@chakra-ui/react";
import { useLocation } from 'react-router';
import axios from "axios";
import api from "../../customApi";
import { Spinner } from "@chakra-ui/react";
import { useSendLogoutMutation } from "../../auth/authApiSlice";
import { logOut } from "../../auth/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await sendLogout();
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  const empNo = location.state?.employee;
  const language = localStorage.getItem("language") || "عربي"
  const [loading, setLoading]= useState(false)
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [userID, setUserID] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [homeMobile, setHomeMobile] = useState("");
  const [relativeMobile, setRelativeMobile] = useState("");
  const [shift, setShift] = useState("");
  const { data:data, isLoading, refetch } = useQuery(["userphoto"], async () => {
    const response = await fetch(`${api}/get/employee?value=${empNo}`);
    const data = await response.json();
    return data;
  });

  const { data: data2, isLoading: photoLoading , refetch:refetch2} = useQuery(
    ["iqamaphoto"],
    async () => {
      const response = await fetch(`${api}/customer/employee?value=${empNo}`);
      const data = await response.json();
      return data;
    }
  );
   let startTime = new Date(`2000-01-01T${data2?.shift}`);
   let endTime = new Date(startTime.getTime() + 8 * 60 * 60 * 1000);
   const formattedStartTime = startTime.toTimeString().slice(0, 8);
   const formattedEndTime = endTime.toTimeString().slice(0, 8);
   const formattedShift = `${formattedStartTime} - ${formattedEndTime}`;
  if (isLoading || photoLoading) {
    return <div className="flex flex-row justify-center items-center font-semibold text-blue-700 gap-3 h-screen">
      <p>جاري إستدعاء البيانات</p>
      <Spinner />
      </div>
  }
  const handleFileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('userPhoto', userPhoto);
    formData.append('userID', userID);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('homeMobile', homeMobile);
    formData.append('relativeMobile', relativeMobile);
    formData.append('shift', shift);
    try {
      const response = await axios.post(`${api}/upload/photos`, formData);
      const { userPhotoUrl, userIDUrl} = response.data;
      await axios.put(`${api}/usersphoto?value=${data2?.emp_no}`, { userPhotoUrl, userIDUrl, email: email, mobile,homeMobile, relativeMobile, shift});
      setLoading(false);
      handleClose1();
      // refetch2();
      // refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        customClass: {
          container: "my-swal",
          popup: "my-swal-popup",
          title: "my-swal-title",
          icon: "my-swal-icon",
          content: "my-swal-content",
          confirmButton: "my-swal-confirm-button",
          denyButton: "my-swal-deny-button",
          cancelButton: "my-swal-cancel-button",
        },
        title: language === "English" ? `Information Updated Successfully`:`تم تحديث البيانات بنجاح`,
        showConfirmButton: false,
        timer:3000,
      });
      setUserPhoto(null);
      setUserID(null);
      setEmail("")
    } catch (error) {
      if (error.response && error.response.status === 404) {
      setLoading(false);
      handleClose1();
        Swal.fire({
          position: "center",
          icon: "error",
          customClass: "swal-wide",
          title: "يرجي مراجعة إدارة السكن",
          showConfirmButton: true,
        });
      }
      console.error(error);
    }
  }
  
  const handleUserPhotoChange = (event) => { 
    const file = event.target.files[0];
    setUserPhoto(file);
  };
  
  const handleOpen1 = () => {
    setIsOpen1(true);
  };

  const handleClose1 = () => {
    setIsOpen1(false);
    setUserPhoto(null);
    setUserID(null);
    setEmail("");
    setShift("")
  };
  const handleOpen2 = () => {
    setIsOpen2(true);
  };

  const handleClose2 = () => {
    setIsOpen2(false);
  };
  const handleUserIDChange = (event) => {
    const file = event.target.files[0];
    setUserID(file);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  
  const parentDir = language === "English" ? "ltr" : "rtl";
  return (
      <Box dir={parentDir}>
        <div
          className="w-full p-5 font-semibold text-sm min-h-screen bg-indigo-300">
          <div className="p-3 rounded-md bg-gray-200 flex flex-row justify-between items-center">
            <span>{language === "English" ? `Welcome : ${data2?.name}` : `مرحباً بك : ${data2?.name}`}</span>
          <svg onClick={handleLogOut} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" cursor={'pointer'} strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
            </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-5">
            <div className="w-full col-span-1 bg-gray-200 gap-4 p-3 flex-grow flex flex-col justify-center items-center rounded-lg h-auto">
            <Image
                    src={data2?.emp_photo}
                    alt="avatar"
                    borderRadius="full"
                    boxSize="150px"
                  />
                  <h1>{language === "English" ? `Name : ${data2?.name}` : `الإسم: ${data2?.name}`}</h1>
                  <span>{language === "English" ? `ID : ${data2?.emp_no}` : `الرقم الوظيفي : ${data2?.emp_no}`}</span>
                  <span>{language === "English" ? `Mobile : ${data2?.mobile}` : `الجوال : ${data2?.mobile}`}</span>
                  <ButtonGroup size={'sm'}>
                  <Button colorScheme='blue' variant='solid' onClick={handleOpen1}>{language === "English" ? "Update Info." : "تحديث البيانات"}</Button>
                  <Button onClick={handleOpen2} colorScheme='blue' variant='outline'>{language === "English" ? "Maintainence req." : "طلب صيانة "}</Button>
                </ButtonGroup>
                <Modal isOpen={isOpen1} onClose={handleClose1} size='lg'>
                  <ModalContent dir={parentDir} bg={'gray.100'} >
                    <ModalHeader fontSize='md' className="bg-blue-300 p-4 rounded-md font-semibold text-sm">{language === "English" ? "Update Information :" : "تحديث البيانات :"}</ModalHeader>
                    <ModalBody className="p-4 mt-3 text-sm">
                      <div className="flex flex-col py-2 font-semibold">
                        <label fontSize='sm'>{language === "English" ? "Personal Photo :" : "صورة شخصية :"}</label>
                        <input className="mt-1 block w-full py-1.5 px-2 border border-blue-500 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500  sm:text-sm" type="file" capture="camera" accept="image/*" onChange={handleUserPhotoChange} />
                      </div>
                      <div className="flex flex-col py-2 font-semibold">
                        <label fontSize='sm'>{language === "English" ? "Iqama Photo :" : "صورة الإقامة :"}</label>
                        <input className="mt-1 block w-full py-1.5 px-2 border border-blue-500 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500  sm:text-sm" type="file" capture="camera" accept="image/*" onChange={handleUserIDChange} placeholder="إختر ملف" />
                      </div>
                      <div className="flex flex-col py-2 font-semibold">
                        <label fontSize='sm'>{language === "English" ? "Email :" : "البريد الإلكتروني :"}</label>
                        <input className="mt-1 block w-full py-1.5 px-2 border border-blue-500 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500  sm:text-sm" type="email" value={email} onChange={handleEmailChange} placeholder={language === "English" ? "Email" : "البريد الإلكتروني"}/>
                      </div>
                      <div className="flex flex-col py-2 font-semibold">
                      <label htmlFor="mobile">{language === "English" ? "Mobile :" : "الجوال :"}</label>
                      <input
                        autoComplete="off"
                        className="mt-1 w-full rounded shadow-sm py-1.5 px-2 border border-blue-500  focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        type="number"
                        id="mobile"
                        name="mobile"
                        placeholder={language === "English" ? "Mobile" : "الجوال"}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                      </div>
                      <div className="flex flex-col py-2 font-semibold">
                      <label htmlFor="homeMobile">{language === "English" ? "A relative's mobile number :" : "جوال أحد الأقرباء :"}</label>
                      <input
                        autoComplete="off"
                        className="mt-1 w-full rounded shadow-sm py-1.5 px-2 border border-blue-500  focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        type="number"
                        id="homeMobile"
                        name="homeMobile"
                        placeholder={language === "English" ? "A relative's mobile number" : "جوال أحد الأقرباء"}
                        value={relativeMobile}
                        onChange={(e) => setRelativeMobile(e.target.value)}
                      />
                      </div>
                      <div className="flex flex-col py-2 font-semibold">
                      <label htmlFor="relativeMobile">{language === "English" ? "Home Mobile :" : "جوال خارجي :"}</label>
                      <input
                        autoComplete="off"
                        className="mt-1 w-full rounded shadow-sm py-1.5 px-2 border border-blue-500  focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        type="number"
                        id="relativeMobile"
                        name="relativeMobile"
                        placeholder={language === "English" ? "Home Mobile" : "جوال خارجي"}
                        value={homeMobile}
                        onChange={(e) => setHomeMobile(e.target.value)}
                      />
                      </div>
                      <div className="flex flex-col py-2 font-semibold">
                      <label htmlFor="shift">{language === "English" ? "Shift :" : "الوردية :"}</label>
                      <input
                        autoComplete="off"
                        className="mt-1 w-full rounded shadow-sm py-1.5 px-2 border border-blue-500  focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        type="time"
                        id="shift"
                        name="shift"
                        placeholder={language === "English" ? "Shift" : "الوردية"}
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                      />
                      </div>
                    </ModalBody>
                    <div className="flex flex-row w-full items-center justify-end gap-5 p-5">
                    <Button  isDisabled={!(userPhoto || userID || email || mobile || shift || homeMobile || relativeMobile)} onClick={handleFileUpload} colorScheme='blue' rightIcon={language === "English" ?<ArrowForwardIcon />:<ArrowBackIcon />} size='sm'>{language === "English" ? loading?<Spinner/>:"Submit" : loading?<Spinner/>:"حفظ"}</Button>
                      <Button onClick={handleClose1} colorScheme='blue' size='sm'>{language === "English" ? "Cancel" : "إلغاء"}</Button>
                      </div>
                  </ModalContent>     
                </Modal>
                <Modal isOpen={isOpen2} onClose={handleClose2} size='lg'>    
                  <ModalContent dir={parentDir} bg={'gray.100'} >
                    <ModalHeader fontSize='md' className="bg-blue-300 p-4 rounded-md font-semibold text-sm">{language === "English" ? "Create Maintainence Request :" : "إنشاء طلب صيانة :"}</ModalHeader>
                    <ModalBody className="p-4 mt-3 text-sm">
                      <FormControl mt={4}>
                        <FormLabel fontSize='sm'>{language === "English" ? "Maintainence Type :" : "نوع الصيانة :"}</FormLabel>
                        <Input bg={'white'} fontWeight={'semibold'} size={'sm'} borderRadius={'md'} type="text" variant='outline' value={email} onChange={handleEmailChange} borderColor="blue.300" padding='1'placeholder={language === "English" ? "Maintainence type" : "نوع الصيانة"}/>
                      </FormControl> 
                    </ModalBody>
                    <div className="flex flex-row w-full items-center justify-end gap-5 p-5">
                    <Button colorScheme='blue' rightIcon={language === "English" ?<ArrowForwardIcon />:<ArrowBackIcon />} size='sm'>{language === "English" ? "Submit" : "حفظ"}</Button>
                      <Button onClick={handleClose2} colorScheme='blue' size='sm'>{language === "English" ? "Cancel" : "إلغاء"}</Button>
                      </div>
                  </ModalContent>
                </Modal>
            </div>
            <Box className="w-full col-span-1 p-2 gap-2 rounded-lg bg-gray-200" display="flex">
              <div className="w-full">
                  <h1 className="mb-5">{language === "English" ? "Iqama photo :" : "صورة الإقامة :"}</h1>
                  <Image
                    src={data2?.iqama_photo}
                    alt="avatar"
                    borderRadius="md"
                    boxSize="250px"
                    width='full'
                  />
              </div>
            </Box>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-5">
          <div className="w-full col-span-1 bg-gray-200 gap-4 p-3  rounded-lg">
          <h1 className="mb-3">{language === "English" ? "Personal Information:" : "البيانات الشخصية"}</h1>
          <Box>
              <Box>
                <Flex height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Full Name :" : "الإسم بالكامل :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.name}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                  <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Email :" : "البريد الإلكتروني :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data2?.email}</Text> 
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                  <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Shift :" : "الوردية :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{formattedShift}</Text> 
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Mobile :" : "جوال :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data2?.mobile}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'40px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "A relative's mobile number  :" : "جوال أحد الأقرباء :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data2?.relativeMobile}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Home Mobile :" : "جوال خارجي :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data2?.homeMobile}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Nationality :" : "الجنسية :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.nationality}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Project :" : "المشروع :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.project}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Iqama number :" : "رقم الإقامة :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.iqama_no}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Status :" : "الحالة :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.out_reason || 'علي رأس العمل'}</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
            </div>
          <div className="w-full col-span-1 bg-gray-200 gap-4 p-3  rounded-lg">
              <h1 className="mb-3">{language === "English" ? "Housing Information :" : "بيانات التسكين :"}</h1>
            <Box>
              <Box>
                <Flex height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "House :" : "السكن :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.housing || 'غير منتسب للسكن'}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "In date :" : "تاريخ التسكين :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.in_date || 'غير منتسب للسكن'}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Out date :" : "تاريخ الإخلاء :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.out_date}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Zone no. :" : "رقم الزون :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">123</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Unit no. :" : "رقم الوحدة :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">123</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Room no. :" : "رقم الغرفة :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">{data?.room_no || 'غير منتسب للسكن'}</Text>
                  </Box>
                </Flex>
                <hr />
                <Flex mt="2" height={'30px'}>
                <Box flexBasis={{ base: '35%', sm: '20%' }}>
                    <Text>{language === "English" ? "Bed no. :" : "رقم السرير :"}</Text>
                  </Box>
                  <Box flexBasis={{ base: '65%', sm: '80%' }}>
                    <Text color="gray.500">123</Text>
                  </Box>
                </Flex>
                <hr />
              </Box>
            </Box>
            </div>
            
          </div>
          <h1 className="mt-5">{language === "English" ? "SBG camps adminstration" : "إدارة الخدمات المساندة للموارد البشرية"}</h1>
        </div>
      </Box>
  );
};

export default UserProfile;
