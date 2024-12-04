export const transformLoginResponse = (responseData) => {
  return {
    token: responseData.token || null,
    user: responseData.user || null
  }
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
