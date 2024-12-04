import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/assetExp'
import { ErrorMessage } from './error_msg';

const Formfield = ({
    containerStyle = "",
    handleChangeText,
    title,
    placeholder,
    keyboardType = 'none',
    value = "",
    errorMsg = "",
    isSecureEntry = false,
    multiline = false,
    numberOfLines = 1,
}) => {
    const [showPassword, setShowPassword] = useState(isSecureEntry);

    return (
        <View className={`${containerStyle} flex gap-2`}>
            <Text className='text-gray-500 font-pmedium text-base'>{title}</Text>
            <View>
                <View className={`relative bg-black-200 px-4 ${multiline ? 'h-32' : 'h-16'} w-full rounded-lg border-2 border-black-200 focus:border-secondary flex flex-row items-${multiline ? 'start' : 'center'}`}>
                    <TextInput
                        onChangeText={handleChangeText}
                        value={value}
                        className='w-full h-full text-white'
                        placeholderTextColor="#7B7B8B"
                        placeholder={placeholder}
                        secureTextEntry={showPassword}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        textAlignVertical={multiline ? 'top' : 'center'}
                    />
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
                {errorMsg && <ErrorMessage message={errorMsg} />}
            </View>
        </View>
    )
}

export default Formfield