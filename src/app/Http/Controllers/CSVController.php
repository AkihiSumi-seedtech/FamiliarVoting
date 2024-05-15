<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CSVControllerName extends Controller
{
    public function import_csv(Request $request)
    {
        // アップロードファイルのファイルパスを取得
        $file_path = $request->file('csv')->path();
        // CSV取得
        $file = new \SplFileObject($file_path);
        $file->setFlags(
            \SplFileObject::READ_CSV |// CSVとして行を読み込み
            \SplFileObject::READ_AHEAD |// 先読み／巻き戻しで読み込み
            \SplFileObject::SKIP_EMPTY | // 空行を読み飛ばす
            \SplFileObject::DROP_NEW_LINE// 行末の改行を読み飛ばす
        );
        // 一行ずつ処理
        $data = []; // $dataをループの外で定義
        foreach($file as $line)
        {
            $data[] = [
                'can_id'     => $line[0],
                'can_name'   => $line[1],
                'can_party'    => $line[2],
            ];
        }
        
        var_dump($data);
        exit;
    }
}









