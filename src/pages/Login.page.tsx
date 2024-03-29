import React, { useContext } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { login } from 'api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'components';
import { useTranslation } from 'react-i18next';

interface FormData {
  username: string;
  password: string;
}

export const Login = (): JSX.Element => {
  const { t } = useTranslation('login');
  const { handleSubmit, register } = useForm<FormData>({});

  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    if (data.username && data.password) {
      const { accessToken } = await login(data);
      accessToken && setAccessToken(accessToken);
      accessToken && navigate('/');
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
                <Input {...register('username', { required: true })} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>{t('password')}</FormLabel>
                <Input
                  type="password"
                  {...register('password', { required: true })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>{t('remember_me')}</Checkbox>
                  <Link color={'blue.400'}>{t('forgot_password')}</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  {t('sign_in')}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};
