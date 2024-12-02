import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
const Formfield = ({
    containerStyle = "",
    handleChangeText,
    title,
    placeholder,
    keyboardType = 'none',
    value = ""
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`${containerStyle} flex gap-2`}>
            <Text className='text-gray-500 font-pmedium text-base'>{title}</Text>
            <View className='relative bg-black-200 px-4 h-16 w-full rounded-lg border-2 border-black-200 focus:border-secondary flex flex-row items-center'>
                <TextInput
                    onChange={handleChangeText}
                    value={value}
                    className='w-full h-full'
                    placeholderTextColor="#7B7B8B"
                    placeholder={placeholder}
                />
                    {/* keyboardType = {keyboardType}  */}
                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <View className='right-5'>
                            <Image
                                source={!showPassword ? icons.eye : icons.eyeHide}
                                className="w-6 h-6"
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default Formfield