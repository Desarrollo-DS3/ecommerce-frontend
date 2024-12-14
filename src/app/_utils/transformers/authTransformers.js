export const transformLoginResponse = (responseData) => {
  const token = responseData?.access_token?.access || null
  const user = responseData?.access_token?.user || null
  const role = user?.role || null

  return { token, user, role }
}

export const transformRegisterUserResponse = (responseData) => {
  return {
    success: true,
    user: responseData.user || null,
    message: responseData.message || 'Usuario registrado con éxito.'
  }
}

export const transformRegisterWarehouseAssistantResponse = (responseData) => {
  return {
    success: true,
    assistant: responseData.assistant || null,
    message:
      responseData.message || 'Asistente de almacén registrado con éxito.'
  }
}

export const transformLoadAuxiliariesResponse = (auxiliaryData) => {
  return auxiliaryData.map((auxiliary) => ({
    id: auxiliary.id,
    firstName: auxiliary.first_name,
    lastName: auxiliary.last_name,
    email: auxiliary.email
  }))
}
