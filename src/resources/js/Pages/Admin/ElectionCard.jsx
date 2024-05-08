import React from 'react'

const ElectionCard = () => {
  return (
<button id="main" class="p-2 justify-around ml-32 h-48 w-3/4 flex items-center bg-white-200 border-solid border-2 border-bg-slate-500 rounded-lg">
    <div>
    <div class="border-solid border-2 border-gray bg-white  py-4 w-80 flex flex-col rounded-lg font-bold">Name</div>
    <div class="bg-green-400 py-4 w-32 mt-4 flex flex-col items-center justify-center rounded-lg font-bold">
  Status
</div>

    </div>

<div class="flex flex-low">
    <div class="border-solid border-2 border-gray bg-white  py-0.3 w-32  mr-4 pt-5 text-center rounded-lg font-bold">開始日
    <div class="py-4 w-32 mt-10 flex flex-col font-bold">日付</div>
    </div>
    <div class="border-solid border-2 border-gray bg-white py-0.3 w-32 pt-5 text-center rounded-lg font-bold">終了日
    <div class="py-4 w-32 mt-10 flex flex-col font-bold">日付</div>
    </div>
    </div>
</button>
  )
}

export default ElectionCard