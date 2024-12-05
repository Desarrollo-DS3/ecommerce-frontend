export default function LoadingOverlay() {
  return (
    <div
      className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'
      data-testid='loading-overlay'
    >
      <div
        className='w-16 h-16 border-4 border-t-orange-500 border-gray-300 rounded-full animate-spin'
        data-testid='loading-spinner'
      />
    </div>
  )
}
