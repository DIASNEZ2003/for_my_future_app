import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Index = () => {
  const router = useRouter()
  
  return (
    <View className='flex-1 justify-center items-center gap-4'>
      <Text className='text-lg font-bold'>Landing Page ni siya baby</Text>
      
      <TouchableOpacity 
        className='bg-blue-500 px-6 py-3 rounded-lg'
        activeOpacity={0.8}
        onPress={() => router.push('/home')}
      >
        <Text className='text-white font-semibold'>Click ni Baby</Text>
      </TouchableOpacity>
      
    
    </View>
  )
}

export default Index