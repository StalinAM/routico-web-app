export function CloseButton({ setIsOpen }) {
  return (
    <button
      onClick={() => setIsOpen(false)}
      className='cursor-pointer hover:bg-azur-800 rounded-md p-1 hover:text-azur-50'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
        <path d='M18 6l-12 12'></path>
        <path d='M6 6l12 12'></path>
      </svg>
    </button>
  )
}
