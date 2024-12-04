export default function RegisterForm({
  formData,
  handleChange,
  handleNumberInput,
  errors,
  showErrors
}) {
  return (
    <div className='grid grid-cols-2 gap-6'>
      <div>
        <p className='font-semibold mb-4 text-orange-500'>Datos personales</p>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>
            Documento de identidad <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='id'
            value={formData.id}
            onChange={handleNumberInput}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
          />
          {showErrors && errors.id && (
            <p className='text-red-500 text-xs mt-1'>{errors.id}</p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>
            Fecha de nacimiento <span className='text-red-500'>*</span>
          </label>
          <input
            type='date'
            name='birthdate'
            value={formData.birthdate}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
          />
          {showErrors && errors.birthdate && (
            <p className='text-red-500 text-xs mt-1'>{errors.birthdate}</p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>
            Nombres <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
          />
          {showErrors && errors.firstName && (
            <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>
            Apellidos <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
          />
          {showErrors && errors.lastName && (
            <p className='text-red-500 text-xs mt-1'>{errors.lastName}</p>
          )}
        </div>
      </div>
      <div>
        <p className='font-semibold mb-4 text-orange-500'>Datos de cuenta</p>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>
            Celular <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleNumberInput}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
          />
          {showErrors && errors.phone && (
            <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>
            Correo <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
          />
          {showErrors && errors.email && (
            <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>
            Contraseña <span className='text-red-500'>*</span>
          </label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
          />
          {showErrors && errors.password && (
            <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
          )}
        </div>
      </div>
    </div>
  )
}
