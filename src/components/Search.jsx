export function Search({ searchTerm, setSearchTerm }) {
  return (
    <label
      htmlFor='search'
      className='relative placeholder:text-gray-500 text-base'
    >
      <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
        <svg
          className='w-4'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0'></path>
          <path d='M21 21l-6 -6'></path>
        </svg>
      </div>
      <input
        type='text'
        name='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='border bg-azur-50 border-gray-200 rounded-xl py-2 pl-8 pr-4 w-full'
        placeholder='Buscar por nombre'
      />
    </label>
  )
}
