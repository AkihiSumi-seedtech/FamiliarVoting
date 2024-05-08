import React from 'react'

const ElectionCard = () => {
  return (
<div id="main" class="p-2 justify-around ml-32 h-48 w-3/4 flex items-start flex items-center bg-white-200 border-solid border-2 border-bg-slate-500 rounded-lg">
    <div>
    <div class="border-solid border-2 border-black bg-white  py-4 w-80 flex flex-col">Name</div>
    <div class="bg-green-400  py-4 w-32 mt-4 flex flex-col flex items-start rounded-lg">Status</div>
    </div>

<div class="flex flex-low">
    <div class="border-solid border-2 border-black bg-white  py-0.3 w-32  mr-4 text-center">開始日
    <div class="py-4 w-32 mt-10 flex flex-col">日付</div>
    </div>
    <div class="border-solid border-2 border-black bg-white py-0.3 w-32 text-center">終了日
    <div class="py-4 w-32 mt-10 flex flex-col">日付</div>
    </div>
    </div>
</div>

  )
}

export default ElectionCard