import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signup } from 'api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'components';
import { useTranslation } from 'react-i18next';

interface FormData {
  username: string;
  password: string;
}

export const Register = (): JSX.Element => {
  const { t } = useTranslation('register');
  const { handleSubmit, register } = useForm<FormData>({});
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.username && data.password) {
      setErrors([]);

      const result = await signup(data);
      if (result.status === 'success') {
        setAccessToken(result.accessToken);
        navigate('/');
      } else {
        setErrors(result.messages);
      }
    }
  };

  return (
    <Flex
      minH={'100vh'}
      minW={'100vw'}
      align={'center'}
      justify={'center'}
      bg={'gray.50'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{t('head1')}</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {t('head2')} <Link color={'blue.400'}>{t('features')}</Link>
          </Text>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>{t('username')}</FormLabel>
                <Input
                  type="username"
                  {...register('username', { required: true })}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>{t('password')}</FormLabel>
                <Input
                  type="password"
                  {...register('password', { required: true })}
                />
              </FormControl>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  {t('sign_up')}
                </Button>
              </Stack>
            </Stack>
            {errors.length > 0 && (
              <VStack mt="5">
                {errors.map((err, idx) => (
                  <Text key={idx} color="red.500">
                    {err}
                  </Text>
                ))}
              </VStack>
            )}
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};
