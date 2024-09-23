import React, { useContext, useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { style } from "./styles";
import logo from './../../assets/calcular.png';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import AuthContext from "@/context/authContext";

export default function Login() {
    const { login, user } = useContext(AuthContext); // Acessa a função login e o estado do usuário do contexto

    // Se o usuário já estiver logado, redireciona para a página home
    if (user) {
        router.replace('/home'); // Redireciona para a home se o login estiver ativo
        return null;
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    // Usa a função login do AuthContext para tentar logar
    async function handleLogin() {
        setLoading(true);

        try {
            const success = await login(email, password); // Chama a função login do contexto

            if (success) {
                router.replace('/home'); // Redireciona para a home se o login for bem-sucedido
            }
        } catch (error) {
            console.error("Erro no login:", error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar realizar o login.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={logo} style={style.logo} resizeMode="contain" />
                <Text style={style.title}>Bem-vindo de volta!</Text>
            </View>
            <View style={style.boxMid}>
                <Text style={style.labelInput}>Endereço de e-mail:</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.fieldInput} 
                        value={email} 
                        onChangeText={setEmail} 
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <MaterialIcons name="email" size={20} color={'gray'} />
                </View>

                <Text style={style.labelInput}>Senha:</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.fieldInput} 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry={hidePassword} // Alterna entre mostrar e esconder a senha
                        autoCapitalize="none" // Desativa auto capitalização para senha 
                    />
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        <MaterialIcons 
                            name={hidePassword ? "visibility-off" : "visibility"} 
                            size={20} 
                            color={'gray'} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.buttonLogin} onPress={handleLogin}>
                    {
                        loading ? 
                            <ActivityIndicator color={'#FFFF'} /> : <Text style={style.buttonText}>Entrar</Text>
                    }
                </TouchableOpacity>
            </View>
            <Text style={style.textBottom}>
                Não tem conta? 
                <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style={{ color: 'lightblue' }}> Crie uma agora</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}
