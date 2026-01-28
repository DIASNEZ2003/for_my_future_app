import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router'; // 1. Import useRouter

const LoginScreen = () => {
  const router = useRouter(); // 2. Initialize the router
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = "http://10.0.2.2:8000/login"; // Use 10.0.2.2 for Emulator
  const HIDDEN_DOMAIN = "@example.com"; 

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    
    // Auto-combine username with your hidden domain
    const fullEmail = `${username.trim().toLowerCase()}${HIDDEN_DOMAIN}`;

    try {
      const response = await axios.post(API_URL, {
        email: fullEmail,
        password: password
      });

      const { token, profile } = response.data;
      
      // 3. Successful Login -> Navigate to /home
      console.log("Logged in as:", fullEmail);
      router.push('/home'); 

    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Connection failed";
      Alert.alert("Login Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-slate-50">
      <View className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
        <Text className="text-3xl font-bold text-slate-800 text-center mb-2">
          Student Login
        </Text>
        <Text className="text-slate-500 text-center mb-8">
          Monitoring Portal
        </Text>
        
        <View className="space-y-4">
          <TextInput
            className="bg-slate-100 p-4 rounded-2xl text-slate-800 border border-slate-200"
            placeholder="Username"
            placeholderTextColor="#94a3b8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            className="bg-slate-100 p-4 rounded-2xl text-slate-800 border border-slate-200"
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            className={`bg-blue-600 p-4 rounded-2xl items-center mt-4 ${loading ? 'opacity-70' : ''}`}
            onPress={handleLogin} // Triggers the backend check + navigation
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;