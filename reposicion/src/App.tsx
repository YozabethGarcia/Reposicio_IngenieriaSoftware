import React from 'react';
import { Formik } from 'formik';
import { FormControl, FormLabel, Button, Input, Box, Center, Text, SimpleGrid } from "@chakra-ui/react";
import "reflect-metadata";
import AddUser from "../postgress/src/index";
function App(){

   /* const AddUserNew = (name: string, lastname: string, identification:string, born:string, email: string, password: string) => {
      let date = born; 
      let newDate = new Date(date);
      AddUser(name, lastname, identification, newDate, email, password);
    }*/

    return(  
      <Box position="fixed" bgGradient="linear(to-r, green.200, pink.500)" height="100%" width="100%">
      <Text fontSize="28px" bg="black" fontWeight="extrabold" padding="25px 25px 10px 25px" color="white">Registrar</Text>
      <Center>
          <Box width="70%" marginTop="20px">   
            <Formik
              initialValues={{ name: '', lastname: '', identification:'', born:'', email: '', password: '', photo: '' }}
              validate={values => {
                const errors = { email: '', password: '' };
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  //AddUserNew(values.name, values.lastname, values.identification, values.born, values.email, values.password)
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <SimpleGrid columns={2} spacing={1} >
                    <Box paddingX="20px">
                    <FormControl id="name" marginBottom="20px" borderRadius="inherit">
                      <FormLabel color="white">Nombre:</FormLabel>
                      <Input
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      borderWidth="2.7px"
                      />
                      {errors.name && touched.name && errors.name}
                    </FormControl>                        
                    <FormControl id="photo" backgroundColor="darkslategrey" borderRadius="7px" paddingY="15px">
                      <div className="content_uploader">
                      <div className="box">
                      <Input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.photo}
                        borderWidth="2.7px"
                        className="filefield"
                      />
                      <p className="select_bottom">Cargar fotografía</p>
                        <div className="spinner"></div>
                        <div className="overlay_uploader"></div>
                      </div>
                    </div>
                      {errors.photo && touched.photo && errors.photo}
                    </FormControl>                           
                    </Box>
                    <Box paddingX="20px">
                    <FormControl id="lastname" marginBottom="20px">
                      <FormLabel color="white">Apellido:</FormLabel>
                      <Input
                      type="lastname"
                      name="lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                      borderWidth="2.7px"
                      />
                      {errors.lastname && touched.lastname && errors.lastname}
                    </FormControl>  
                    <FormControl id="identification" marginBottom="20px">
                      <FormLabel color="white">Identificación:</FormLabel>
                      <Input
                      type="identification"
                      name="identification"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.identification}
                      borderWidth="2.7px"
                      />
                      {errors.identification && touched.identification && errors.identification}
                    </FormControl>
                    <FormControl id="born" marginBottom="20px">
                      <FormLabel color="white">Fecha de Nacimiento:</FormLabel>
                      <Input
                      type="date"
                      name="born"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.born}
                      borderWidth="2.7px"
                      />
                      {errors.born && touched.born && errors.born}
                    </FormControl>
                    <FormControl id="email" marginBottom="20px">
                      <FormLabel color="white">Correo:</FormLabel>
                      <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      borderWidth="2.7px"
                      />
                      {errors.email && touched.email && errors.email}
                    </FormControl>   
                    <FormControl id="password" marginBottom="20px">
                      <FormLabel color="white">Contraseña:</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        borderWidth="2.7px"
                      />
                      {errors.password && touched.password && errors.password}
                    </FormControl>       
                    <Button type="submit" colorScheme="teal" disabled={isSubmitting} width="100%">
                      Registrar
                    </Button>              
                    </Box>           
                    </SimpleGrid>
                  </form>
                )}
              </Formik>
          </Box>
        </Center>
      </Box>
    )
}
export default App;