import { saveAs } from 'file-saver'
import Papa from 'papaparse'

export function downloadCSV<T extends object>(data: T[], filename: string) {
  if (!data.length) {
    alert('다운로드할 데이터가 없습니다.')
    return
  }

  // PapaParse를 사용하여 강력한 CSV 포맷팅을 제공 (따옴표, 쉼표, 개행 등 처리).
  const csv = Papa.unparse(data)

  // 엑셀에서 한글이 깨지지 않도록 BOM(Byte Order Mark)을 추가.
  const BOM = '\uFEFF'
  const csvWithBOM = BOM + csv

  const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8' })

  // FileSaver를 사용하여 브라우저 호환성을 보장하며 파일을 저장.
  saveAs(blob, filename.endsWith('.csv') ? filename : `${filename}.csv`)
}
