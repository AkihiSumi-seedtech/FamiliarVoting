
import React, { useState } from 'react';

function Vote({ auth }) {
  const initializedData = {
    themeColor: "default"
  };

  const [data, setData] = useState(initializedData);

  const handleThemeColorChange = (e) => {
    const newData = { ...data, themeColor: e.target.value };
    setData(newData);
  };

  const handleClick = () => {
    // どれか一つのチェックボックスにチェックが入っているかどうかをチェック
    const isCheckboxChecked = data.themeColor !== "default";

    // チェックが入っている場合はアラートを表示し、入っていない場合は投票処理を実行
    if (isCheckboxChecked) {
      // アラートを表示
      
      const confirmVote = window.confirm("投票後の変更はできません。よろしいですか？");
      if (confirmVote) {
        // 「はい」が選択された場合の処理
        window.location.href = '/thanks';
      } else {
        // 「キャンセル」が選択された場合の処理
        // 何もしない
      }
    } else {
      // チェックボックスが選択されていない場合の処理
      alert("少なくとも1つのチェックボックスを選択してください。");
    }
  };

  return (
    <>
      <div className="text-4xl text-black-700 text-center font-semibold">選挙名</div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 bg-[#332D2D] font-medium text-white dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">選択</th>
                    <th scope="col" className="px-6 py-4">氏名</th>
                    <th scope="col" className="px-6 py-4">所属</th>
                    <th scope="col" className="px-6 py-4">詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="whitespace-nowrap px-6 py-4">
                      <input type="checkbox" 
                             id="tanakaCheckbox" 
                             value="tanaka"
                             checked={data.themeColor === "tanaka"}
                             onChange={handleThemeColorChange}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4"></td>
                    <td className="whitespace-nowrap px-6 py-4"></td>
                    <td className="whitespace-nowrap px-6 py-4"></td>
                  </tr>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="whitespace-nowrap px-6 py-4">
                      <input type="checkbox" 
                             id="satouCheckbox" 
                             value="satou"
                             checked={data.themeColor === "satou"}
                             onChange={handleThemeColorChange}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4"></td>
                    <td className="whitespace-nowrap px-6 py-4"></td>
                    <td className="whitespace-nowrap px-6 py-4"></td>
                  </tr>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="whitespace-nowrap px-6 py-4">
                      <input type="checkbox" 
                             id="noneCheckbox" 
                             value="selectedNone"
                             checked={data.themeColor === "selectedNone"}
                             onChange={handleThemeColorChange}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">選択しない</td>
                    <td className="whitespace-nowrap px-6 py-4">--</td>
                    <td className="whitespace-nowrap px-6 py-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     
      <button onClick={() => handleClick()} className="block mx-auto mt-4 px-6 py-3 bg-orange-500 text-white font-bold rounded-full">
        投票する
        </button>
    
    </>
  );
}

export default Vote;
