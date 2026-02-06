
import { PaliWord, GrammarLesson, PaliVerse } from './types';

export const PALI_DIACRITICS = ['ā', 'ī', 'ū', 'ṅ', 'ñ', 'ṭ', 'ḍ', 'ṇ', 'ḷ', 'ṃ'];

export const PALI_VERSES: PaliVerse[] = [
  {
    id: 'v1',
    text: 'Manopubbaṅgamā dhammā manosetṭhā manomayā.',
    meaning: 'Tâm dẫn đầu các pháp, tâm làm chủ, tâm tạo.',
    source: 'Kinh Pháp Cú (Dhp 1)',
    level: 1
  },
  {
    id: 'v2',
    text: 'Appamādo amatapadaṃ, pamādo maccuno padaṃ.',
    meaning: 'Không phóng dật là đường sống, phóng dật là đường chết.',
    source: 'Kinh Pháp Cú (Dhp 21)',
    level: 1
  },
  {
    id: 'v3',
    text: 'Akkocchi maṃ avadhi maṃ, ajini maṃ ahāsi me.',
    meaning: 'Nó mắng tôi, đánh tôi, nó thắng tôi, cướp tôi.',
    source: 'Kinh Pháp Cú (Dhp 3)',
    level: 2
  },
  {
    id: 'v4',
    text: 'Na hi verena verāni, sammantīdha kudācanaṃ.',
    meaning: 'Với hận diệt hận thù, đời này không thể có.',
    source: 'Kinh Pháp Cú (Dhp 5)',
    level: 2
  },
  {
    id: 'v5',
    text: 'Dhammapīti sukhaṃ seti, vippasannena cetasā.',
    meaning: 'Người hỷ lạc trong Pháp, sống hạnh phúc với tâm thanh tịnh.',
    source: 'Kinh Pháp Cú (Dhp 79)',
    level: 3
  },
  {
    id: 'v6',
    text: 'Bahumpi ce sahitaṃ bhāsamāno, na takkaro hoti naro pamatto.',
    meaning: 'Dầu tụng nhiều kinh điển, nhưng thiếu thực hành, người phóng dật ấy không hưởng được hạnh phúc của sa-môn.',
    source: 'Kinh Pháp Cú (Dhp 19)',
    level: 4
  },
  {
    id: 'v7',
    text: 'Asevanā ca bālānaṃ, paṇḍitānañca sevanā.',
    meaning: 'Không thân cận kẻ ngu, nên thân gần bậc trí.',
    source: 'Kinh Hạnh Phúc (Maṅgala Sutta)',
    level: 1
  }
];

export const ALL_WORDS: PaliWord[] = [
  { id: 'd1', level: 1, word: 'Buddha', meaning: 'Bậc Giác Ngộ', category: 'Danh từ (a)', example: 'Buddho loke uppanno.', exampleMeaning: 'Đức Phật xuất hiện ở đời.' },
  { id: 'd2', level: 1, word: 'Dhamma', meaning: 'Giáo pháp, Chân lý', category: 'Danh từ (a)', example: 'Dhammo suakkhāto.', exampleMeaning: 'Pháp được khéo thuyết giảng.' },
  { id: 'd3', level: 1, word: 'Saṅgha', meaning: 'Tăng đoàn', category: 'Danh từ (a)' },
  { id: 'd4', level: 1, word: 'Rājā', meaning: 'Vua (Nam tánh)', category: 'Biến cách đặc biệt', example: 'Rājā raṭṭhaṃ pāleti.', exampleMeaning: 'Đức vua cai quản đất nước.' },
  { id: 'd5', level: 2, word: 'Bhikkhu', meaning: 'Tỳ-kheo, tu sĩ', category: 'Danh từ (u)', example: 'Bhikkhū gāmaṃ pavisanti.', exampleMeaning: 'Các Tỳ-kheo đi vào làng.' },
  { id: 'd6', level: 2, word: 'Kaññā', meaning: 'Thiếu nữ', category: 'Danh từ (ā)', example: 'Kaññāyo hanti.', exampleMeaning: 'Các thiếu nữ đang đi.' },
  { id: 'd7', level: 3, word: 'Citta', meaning: 'Tâm, ý thức', category: 'Danh từ trung tánh', example: 'Cittaṃ dantaṃ sukhāvahaṃ.', exampleMeaning: 'Tâm được điều phục mang lại hạnh phúc.' },
  { id: 'd8', level: 3, word: 'Pacati', meaning: 'Đang nấu (ngôi 3 số ít)', category: 'Động từ', example: 'Sūdo odanaṃ pacati.', exampleMeaning: 'Người đầu bếp đang nấu cơm.' },
  { id: 'd9', level: 4, word: 'Gacchati', meaning: 'Đang đi', category: 'Động từ', example: 'Nagarato gacchati.', exampleMeaning: 'Đi ra khỏi thành phố.' },
  { id: 'd10', level: 4, word: 'Abhibhū', meaning: 'Bậc chiến thắng, làm chủ', category: 'Danh từ (ū)' }
];

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'ch1',
    category: 'Chương I',
    title: 'Mẫu tự (Alphabet)',
    content: `- **§1. Hệ thống mẫu tự**
Pāli có 41 mẫu tự. Gồm 8 nguyên âm (Sara) và 33 phụ âm (Vyañjana).
- **§2-4. Nguyên âm**
  + Đoản âm (Rassa): 'a, i, u'.
  + Trường âm (Dīgha): 'ā, ī, ū, e, o'.
  + Quy tắc §4: Nguyên âm ngắn đứng trước phụ âm đôi (ví dụ 'bhikkhu') hoặc Niggahīta ('ṃ') phát âm nặng và dài như trường âm.
- **§6. Phân loại phụ âm (Vagga)**
  + Họng (Kaṇṭhaja): 'k, kh, g, gh, ṅ'.
  + Vòm miệng (Tāluja): 'c, ch, j, jh, ñ'.
  + Nóc họng (Muddaja): 'ṭ, ṭh, ḍ, ḍh, ṇ'.
  + Răng (Dantaja): 't, th, d, dh, n'.
  + Môi (Oṭṭhaja): 'p, ph, b, bh, m'.
  + Phụ âm lẻ: 'y, r, l, v, s, h, ḷ, ṃ'.
- **§13. Phụ âm đôi (Conjuncts)**
  Trong cùng một nhóm (Vagga), phụ âm 1 có thể đi trước 2, phụ âm 3 có thể đi trước 4. Phụ âm 5 (âm mũi) có thể đứng trước cả 4 âm cùng nhóm.`
  },
  {
    id: 'ch2',
    category: 'Chương II',
    title: 'Luật Hòa âm (Sandhi)',
    content: `- **§14. Đại cương**
Sandhi là sự biến đổi âm thanh tại ranh giới giữa hai từ hoặc hai thành phần từ.
- **§17-20. Hòa âm Nguyên âm**
  + Nuốt âm trước (§17): 'yassa + indriyāni' → 'yassindriyāni'.
  + Nuốt âm sau (§18): 'cattāro + ime' → 'cattārome'.
  + Kéo dài âm sau khi nuốt (§19): 'tatra + ayaṃ' → 'tatrāyaṃ'.
- **§21-26. Biến đổi âm (Substitution)**
  + 'a + i' → 'e': 'upa + ikkhati' → 'upekkhati'.
  + 'a + u' → 'o': 'canda + udayo' → 'candodayo'.
- **§27. Biến thành Bán nguyên âm**
  + 'i, e' → 'y': 'vi + ākāsi' → 'vyākāsi'.
  + 'u, o' → 'v': 'anu + eti' → 'anveti'.
- **§28. Chèn phụ âm (Insertion)**
  Để tránh vấp âm, các âm 'y, v, m, d, n, t, r, l' được chèn vào.
  + Ví dụ: 'ni + antaraṃ' → 'niranataraṃ' (chèn 'r').
- **§37-46. Hòa âm Niggahīta**
  + Trước phụ âm (§39): 'ṃ' biến thành âm mũi cùng nhóm. 'saṃ + gaho' → 'saṅgaho'.
  + Trước nguyên âm (§42): 'ṃ' biến thành 'm'. 'taṃ + ahaṃ' → 'tamahaṃ'.`
  },
  {
    id: 'ch3',
    category: 'Chương III',
    title: 'Đồng hóa (Assimilation) - Chuyên sâu',
    content: `- **§52-54. Nguyên lý Đồng hóa**
Đồng hóa là quá trình một phụ âm biến đổi để trở nên giống hoặc tương tự phụ âm đứng cạnh nó.
- **§58. Đồng hóa Lũy tiến (Progressive)**
Âm đứng trước đồng hóa âm đứng sau (Âm trước thắng).
  + Âm mũi (Cột 5) đồng hóa phụ âm sau: '√lag + na' → 'lanna'.
  + Âm 'g' đồng hóa 'n': '√bhag + na' → 'bhagga'.
- **§59. Đồng hóa Giật lùi (Regressive)**
Âm đứng sau đồng hóa âm đứng trước (Âm sau thắng - Phổ biến nhất).
  + Cột 1, 2, 3, 4 bị đồng hóa bởi âm sau: '√yuj + ta' → 'yutta'; '√lip + ta' → 'litta'.
- **§70-79. Đồng hóa với âm 'Y' (Y-Assimilation)**
Đây là quy tắc quan trọng nhất để hiểu biến thái Động từ:
  + 'y' + âm họng (k, g) → 'kk, gg'.
  + 'y' + âm môi (p, b) → 'pp, bb'.
  + **Sự biến đổi nhóm (§71):** 'y' + âm răng (t, d, dh) biến thành âm vòm miệng (cc, jj, jjh).
    - '√pac + ya' → 'pacca' (Bị động).
    - '√mad + ya' → 'majja'.
    - '√budh + ya' → 'bujjha'.
  + **Đảo vị âm 'H' (§78):** Khi 'y' kết hợp với 'h', chúng đảo vị thành 'yh'.
    - '√gah + ya' → 'gayha'.
- **§80-86. Đồng hóa với âm 'R'**
  + 'r' đứng trước phụ âm: phụ âm đó gấp đôi và 'r' mất đi. '√kar + ta' → 'katta'.
  + 'r' đứng sau phụ âm: phụ âm trước gấp đôi. 'tatra' → 'tatta' (trong một số trường hợp đặc biệt).
- **§93-97. Đồng hóa âm mũi**
  + Âm mũi đứng trước phụ âm khác nhóm sẽ biến thành âm mũi của nhóm đó. 'saṃ + thito' → 'saṇṭhito' (n → ṇ vì thuộc nhóm ṭ).`
  },
  {
    id: 'ch5',
    category: 'Chương V',
    title: 'Biến cách Danh từ (Declension) - Hệ thống 8 Cách',
    content: `- **§116. Tổng quan**
Danh từ Pāli có 3 tánh (Gender), 2 số (Number) và 8 cách (Case).
- **§122. Mẫu Nam tánh vần 'a' (Deva - Chư thiên)**
  1. Chủ cách (Nom): 'devo / devā'
  2. Đối cách (Acc): 'devaṃ / deve'
  3. Sử dụng cách (Inst): 'devena / devehi (devebhi)'
  4. Chỉ định cách (Dat): 'devassa / devānaṃ'
  5. Xuất xứ cách (Abl): 'devasmā (devamhā, devā) / devehi'
  6. Sở thuộc cách (Gen): 'devassa / devānaṃ'
  7. Định sở cách (Loc): 'devasmiṃ (devamhā, deve) / devesu'
  8. Hô cách (Voc): 'deva / devā'
- **§126. Mẫu Nữ tánh vần 'ā' (Kaññā - Thiếu nữ)**
  Đặc điểm: Cách 3 đến cách 7 số ít thường có đuôi 'āya' ('kaññāya').`
  },
  {
    id: 'ch10',
    category: 'Chương X',
    title: 'Động từ (Verbs) - 7 Nhóm Động từ tướng',
    content: `- **§354. Thành phần Động từ**
Động từ = Ngữ căn (Root) + Động từ tướng (Base suffix) + Ngữ vĩ (Endings).
- **§370-380. 7 Nhóm chia (Conjugations)**
  1. Nhóm 1 (§372): Thêm 'a'. '√pac' → 'pacati'.
  2. Nhóm 2 (§373): Chèn âm mũi (Niggahīta). '√chid' → 'chindati'.
  3. Nhóm 3 (§374): Thêm 'ya'. '√div' → 'dibbati' (y bị đồng hóa).
  4. Nhóm 4 (§375): Thêm 'ṇu, ṇā'. '√su' → 'suṇāti'.
  5. Nhóm 5 (§377): Thêm 'nā'. '√ki' → 'kiṇāti'.
  6. Nhóm 6 (§378): Thêm 'u'. '√kar' → 'karoti'.
  7. Nhóm 7 (§379): Thêm 'aya, e'. '√cur' → 'coreti / corayati'.`
  },
  {
    id: 'ch14',
    category: 'Chương XIV',
    title: 'Cú pháp (Syntax) - Cách dùng 8 Cách',
    content: `- **§588. Trật tự câu chuẩn**
Chủ ngữ (Nominative) → Tân ngữ (Accusative) → Động từ (Verb).
- **§590-605. Công năng của các Cách**
  + **Đối cách (§591):** Chỉ mục tiêu của chuyển động. 'Gāmaṃ gacchati' (Đi đến làng).
  + **Sử dụng cách (§593):** Chỉ phương tiện hoặc tác giả (trong câu bị động).
  + **Xuất xứ cách (§597):** Chỉ sự sợ hãi hoặc nguồn gốc. 'Corā bhayaṃ' (Sợ hãi từ kẻ trộm).
  + **Sở thuộc cách (§599):** Chỉ sự sở hữu hoặc một phần của nhóm.
  + **Định sở cách (§602):** Chỉ thời gian hoặc địa điểm.
- **§603. Cấu trúc Tuyệt đối (Absolute Clauses)**
  + **Locative Absolute:** Danh từ (Loc) + Phân từ (Loc). 'Suriye atthaṅgate' (Khi mặt trời đã lặn).`
  }
];
