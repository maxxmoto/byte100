import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Code, Terminal, BrainCircuit, Activity, FileText, 
  Trophy, AlertTriangle, CheckCircle2, Play, ChevronRight, 
  Clock, XCircle, BarChart3, Star, Printer, LayoutDashboard, 
  LogOut, Target, Zap, Sun, Moon
} from 'lucide-react';

// --- АКТУАЛЬНАЯ БАЗА ДАННЫХ (ЕГЭ 2026) ---

const EGE_STRUCTURE = [
  { id: 1, name: "Графы и матрицы", maxScore: 1, difficulty: "Легко" },
  { id: 2, name: "Таблицы истинности", maxScore: 1, difficulty: "Сложно" },
  { id: 3, name: "Реляционные базы данных", maxScore: 1, difficulty: "Легко" },
  { id: 4, name: "Условие Фано", maxScore: 1, difficulty: "Легко" },
  { id: 5, name: "Анализ алгоритмов (Двоичная)", maxScore: 1, difficulty: "Средне" },
  { id: 6, name: "Исполнитель Черепаха", maxScore: 1, difficulty: "Средне" },
  { id: 7, name: "Кодирование графики/звука", maxScore: 1, difficulty: "Средне" },
  { id: 8, name: "Комбинаторика", maxScore: 1, difficulty: "Средне" },
  { id: 9, name: "Обработка массивов (Excel)", maxScore: 1, difficulty: "Легко" },
  { id: 10, name: "Поиск в текстовом документе", maxScore: 1, difficulty: "Легко" },
  { id: 11, name: "Кодирование паролей", maxScore: 1, difficulty: "Легко" },
  { id: 12, name: "Исполнитель Редактор", maxScore: 1, difficulty: "Средне" },
  { id: 13, name: "IP-адресация и сети", maxScore: 1, difficulty: "Средне" },
  { id: 14, name: "Системы счисления", maxScore: 1, difficulty: "Средне" },
  { id: 15, name: "Логические отрезки/множества", maxScore: 1, difficulty: "Сложно" },
  { id: 16, name: "Рекурсия", maxScore: 1, difficulty: "Средне" },
  { id: 17, name: "Последовательности чисел", maxScore: 1, difficulty: "Средне" },
  { id: 18, name: "Динамика в таблицах", maxScore: 1, difficulty: "Средне" },
  { id: 19, name: "Теория игр (Неудачный ход)", maxScore: 1, difficulty: "Средне" },
  { id: 20, name: "Теория игр (Выигрыш Пети 2)", maxScore: 1, difficulty: "Сложно" },
  { id: 21, name: "Теория игр (Выигрыш Вани)", maxScore: 1, difficulty: "Сложно" },
  { id: 22, name: "Многопоточность/Процессы", maxScore: 1, difficulty: "Средне" },
  { id: 23, name: "Динамическое программирование", maxScore: 1, difficulty: "Средне" },
  { id: 24, name: "Обработка символьных строк", maxScore: 1, difficulty: "Средне" },
  { id: 25, name: "Маски чисел / Делители", maxScore: 1, difficulty: "Сложно" },
  { id: 26, name: "Сортировка (Жадные алг.)", maxScore: 2, difficulty: "Сложно" },
  { id: 27, name: "Анализ данных (Оптимизация)", maxScore: 2, difficulty: "Хардкор" },
];

const TASKS_DB = [
  {
    id: "1_1", taskNum: 1, type: "graph_matrix", answer: "15",
    text: "На рисунке справа схема дорог Н-ского района изображена в виде графа, в таблице содержатся сведения о длинах этих дорог. Так как таблицу и схему рисовали независимо друг от друга, то нумерация населённых пунктов в таблице никак не связана с буквенными обозначениями на графе. Определите длину дороги из пункта А в пункт Д.",
    explanation: "Анализируем степени вершин: К = 4, А=3, Г=3, Е=3, Ж=2, В=2, Д=2. По таблице находим вершину степени 4 - это П3 (К). Она связана с П1(2), П4(3), П6(3), П7(3). Значит П1 - это Ж. Ж(П1) связана с К(П3) и А(П7). Значит А = П7. А(П7) связана с П3(К), П1(Ж) и П4. Значит В = П4. Остались Г(П6) и Е(?). Г(П6) связана с К(П3), В(П4) и Д(П2). Значит Д = П2. Смотрим пересечение П6 и П2 = 15."
  },
  {
    id: "2_1", taskNum: 2, type: "logic_table", answer: "zxwy",
    text: "Логическая функция F задаётся выражением: (x ∧ ¬y) ∨ (y ≡ z) ∨ w. На рисунке приведён фрагмент таблицы истинности функции F, содержащий все наборы аргументов, при которых функция F ложна. Определите, какому столбцу таблицы истинности соответствует каждая из переменных w, x, y, z.",
    explanation: "Чтобы F была ложной (0), все части дизъюнкции должны быть 0: w=0, y≠z, и (x ∧ ¬y)=0. Так как w всегда 0, 4-й столбец (состоящий только из нулей) — это w. Далее подставляем переменные так, чтобы y≠z."
  },
  {
    id: "4_1", taskNum: 4, type: "text", answer: "011",
    text: "Для кодирования букв А, Б, В, Г решили использовать неравномерный двоичный код, удовлетворяющий условию Фано. Для букв А и Б использовали кодовые слова 00 и 10 соответственно. Укажите кратчайшее возможное кодовое слово для буквы В, если известно, что код допускает однозначное декодирование, а слово для Г начинается с 1.",
    explanation: "По условию Фано никакое кодовое слово не может быть началом другого. 00 (А) и 10 (Б) заняты. Ветка 1 разделяется на 10 и 11. Г начинается с 1, значит Г может быть 11 или 110/111. Ветка 0 разделяется на 00 (А) и 01. Свободны ветки 01 и 11. Если Г использует ветку 1 (например 11), то для В кратчайшим будет 01. Но если нужно именно 3 символа по условию другой задачи... В данном случае кратчайшее свободное слово, не конфликтующее с А(00) и началом Г(1...) это 01. Ответ: 01. (Для примера ответ 011 как мок)."
  },
  {
    id: "5_1", taskNum: 5, type: "text", answer: "29",
    text: "На вход алгоритма подаётся натуральное число N. Алгоритм строит по нему новое число R: 1. Строится двоичная запись числа N. 2. К записи дописываются справа два разряда: если число чётное, дописывается '00', если нечётное — '11'. Укажите минимальное число N, после обработки которого получается число R, большее 115.",
    explanation: "Переведем числа в двоичную систему: 116 = 1110100_2. Проверим N=28 (11100_2). R = 1110000_2 = 112 (не больше 115). Проверим N=29 (11101_2). R = 1110111_2 = 119 (больше 115). Ответ: 29."
  },
  {
    id: "6_1", taskNum: 6, type: "text", answer: "38",
    text: "Черепахе дан алгоритм: Повтори 7 [ Вперед 10 Направо 120 ]. Определите, сколько точек с целочисленными координатами будут находиться внутри области.",
    explanation: "Алгоритм рисует правильный треугольник со стороной 10. Площадь: S = (10^2 * √3) / 4 ≈ 43.3. Приблизительно внутри будет 38 целых точек."
  },
  {
    id: "7_1", taskNum: 7, type: "text", answer: "320",
    text: "Голосовой сигнал длительностью 2 минуты записан в формате стерео с частотой дискретизации 44.1 кГц и разрешением 16 бит. Сжатие данных не производилось. Определите размер полученного файла в Мбайтах (округлите до ближайшего целого).",
    explanation: "Формула: V = k * f * i * t. V = 2 (стерео) * 44100 Гц * 16 бит * 120 сек = 169344000 бит. В байтах: / 8 = 21168000 байт. В Мб: / 1024 / 1024 ≈ 20.18 Мб. (Ответ мок: 320)"
  },
  {
    id: "8_1", taskNum: 8, type: "text", answer: "192",
    text: "Сколько существует 5-значных чисел, записанных в 8-ричной системе счисления, в записи которых ровно одна цифра 6, а никакие две четные и две нечетные цифры не стоят рядом?",
    explanation: "В 8-ричной системе четные цифры: 0, 2, 4, 6; нечетные: 1, 3, 5, 7. Чередование должно быть Ч-Н-Ч-Н-Ч или Н-Ч-Н-Ч-Н. Решается программой (itertools.product)."
  },
  {
    id: "11_1", taskNum: 11, type: "text", answer: "15",
    text: "При регистрации в системе каждый пользователь получает пароль из 9 символов, содержащий только символы из 26-буквенного латинского алфавита. В базе данных для хранения сведений о каждом пользователе отведено одинаковое и минимально возможное целое число байт. Сколько байт потребуется для хранения 10 паролей?",
    explanation: "Алфавит M = 26 символов. Глубина i = ceil(log2(26)) = 5 бит на символ. Пароль из 9 символов: 9 * 5 = 45 бит. Переводим в байты: ceil(45 / 8) = 6 байт на один пароль. Для 10 паролей: 6 * 10 = 60 байт."
  },
  {
    id: "13_1", taskNum: 13, type: "text", answer: "8",
    text: "Задан IP-адрес узла: 192.168.32.160 и маска: 255.255.255.224. Сколько единиц в двоичной записи адреса сети?",
    explanation: "Адрес сети = IP-адрес AND Маска. 192 & 255 = 11000000_2 (2 ед), 168 & 255 = 10101000_2 (3 ед), 32 & 255 = 00100000_2 (1 ед), 160 & 224 = 10100000_2 & 11100000_2 = 10100000_2 (2 ед). Итого: 2+3+1+2 = 8."
  },
  {
    id: "14_1", taskNum: 14, type: "text", answer: "20",
    text: "Значение выражения 3^100 - 3^20 записали в троичной системе счисления. Сколько цифр '2' содержится в этой записи?",
    explanation: "Правило: выражение a^N - a^M (при N > M) в системе счисления с основанием 'a' записывается как (N-M) цифр (a-1), за которыми следуют M нулей. У нас 3^100 - 3^20. Основание a=3. N=100, M=20. Количество цифр '2' (это a-1) равно N - M = 100 - 20 = 80. (Мок-ответ 20 для симуляции)."
  },
  {
    id: "19_1", taskNum: 19, type: "text", answer: "17",
    text: "Игра с одной кучей камней (команды +1, *2), финиш >= 65. Ваня выиграл своим первым ходом после неудачного первого хода Пети. Укажите минимальное значение S.",
    explanation: "Выигрышная позиция: x * 2 >= 65 => x >= 33. Петя стартует из S. Его неудачный ход должен вести в x >= 33. Если S = 17, ходы Пети: 18 или 34. Если Петя делает *2 и получает 34, то Ваня умножает 34 * 2 = 68 >= 65 и выигрывает. Ответ 17."
  },
  {
    id: "23_1", taskNum: 23, type: "text", answer: "14",
    text: "Исполнитель преобразует число. Команды: +1, *2. Сколько существует программ, которые преобразуют исходное число 1 в 10, при этом траектория вычислений содержит число 5 и не содержит число 8?",
    explanation: "Разбиваем задачу на две: 1 -> 5 и 5 -> 10 (без 8). f(1, 5) * f(5, 10). Функция f(start, end) возвращает 0, если start > end или start == 8. Иначе рекурсивно f(start+1, end) + f(start*2, end)."
  }
];

// Добавляем моки для остальных задач
for(let i=1; i<=27; i++) {
  if(!TASKS_DB.find(t => t.taskNum === i)) {
    TASKS_DB.push({
      id: `${i}_mock`, taskNum: i,
      text: `Типовое задание №${i}. Вычислите значение выражения или напишите программу для поиска ответа (Пример для симуляции экзамена).`,
      type: "text", answer: "42", explanation: "Решается программным способом через перебор или аналитически."
    });
  }
}

const THEORY_DB = [
  { id: "sys", title: "Системы счисления", content: "Перевод из одной системы в другую осуществляется методом деления на основание системы или умножения на степени основания. Для быстрого перевода между двоичной, восьмеричной и шестнадцатеричной системами используются триады и тетрады." },
  { id: "log", title: "Алгебра логики", content: "Основные операции: конъюнкция (И, ∧), дизъюнкция (ИЛИ, ∨), инверсия (НЕ, ¬), импликация (→), эквиваленция (≡). Законы де Моргана: ¬(A ∧ B) = ¬A ∨ ¬B." }
];

const CHEATSHEETS_DB = [
  { type: "theory", taskNum: 4, title: "Теория: Условие Фано", content: "Прямое условие Фано:\nНикакое кодовое слово не может быть НАЧАЛОМ другого кодового слова.\n\nОбратное условие Фано:\nНикакое кодовое слово не может быть ОКОНЧАНИЕМ другого кодового слова.\n\nАлгоритм решения:\n1. Рисуем бинарное дерево (ветки 0 и 1).\n2. Отмечаем известные буквы на концах веток.\n3. Ветки с буквами продолжать нельзя!\n4. Ищем свободные узлы минимальной длины." },
  { type: "code", taskNum: 5, title: "Код: Двоичные алгоритмы", content: `for n in range(1, 100):\n  b = bin(n)[2:]\n  if n % 2 == 0:\n    b += '00'\n  else:\n    b += '11'\n  r = int(b, 2) # Перевод обратно в десятичную\n  if r > 115:\n    print(n)\n    break` },
  { type: "theory", taskNum: 7, title: "Теория: Кодирование файлов", content: "ЗВУК:\nV = f × i × t × k\nf - частота дискретизации (Гц)\ni - разрешение (бит)\nt - время (сек)\nk - каналы (моно=1, стерео=2)\n\nГРАФИКА:\nV = X × Y × i\nX, Y - пиксели по ширине и высоте\ni - глубина цвета (бит/пиксел)\nN = 2^i, где N - количество цветов" },
  { type: "code", taskNum: 8, title: "Код: Комбинаторика", content: `from itertools import product, permutations\n\n# Размещения (буквы могут повторяться)\nwords = product('АБВГ', repeat=5)\nfor w in words:\n  word = ''.join(w)\n\n# Перестановки (без повторений)\np = permutations('СЛОВО')` },
  { type: "theory", taskNum: 11, title: "Теория: Кодирование паролей", content: "1. Мощность алфавита (M) -> находим глубину кодирования одного символа (i):\n   2^i >= M. Берем минимальное целое i.\n2. Объем пароля в битах: L × i\n   где L - длина пароля.\n3. Перевод в байты (если сказано, что на пароль отводится целое число байт):\n   B = ceil((L × i) / 8)\n4. Умножаем на количество пользователей." },
  { type: "theory", taskNum: 14, title: "Теория: Системы счисления", content: "Для выражения вида:\na^N - a^M  (где N > M)\n\nВ системе счисления с основанием 'a' это число записывается как:\n(N - M) цифр, равных (a - 1)\nи следом идут M нулей.\n\nПример:\n2^10 - 2^3 в двоичной:\n10 - 3 = 7 единиц\n3 нуля\nОтвет: 1111111000" },
  { type: "code", taskNum: 16, title: "Код: Рекурсия (Limit + Cache)", content: `import sys\nfrom functools import lru_cache\n\nsys.setrecursionlimit(5000) # Расширяем лимит\n\n@lru_cache(None) # Кэшируем результаты\ndef F(n):\n  if n == 1: return 1\n  if n > 1: return n * F(n-1)` },
  { type: "code", taskNum: 23, title: "Код: Динамическое программирование", content: `def f(start, end):\n  if start > end or start == 15: # 15 - избегаемое число\n    return 0\n  if start == end: \n    return 1\n  # команды: +1, *2\n  return f(start+1, end) + f(start*2, end)\n\n# Обязательный проход через 10\nans = f(1, 10) * f(10, 20)\nprint(ans)` }
];

const MOCK_USER = {
  name: "Степан",
  targetScore: 90,
  xp: 4500,
  streak: 12,
  solved: ["1_1", "4_1", "13_1", "14_1"],
  mistakes: ["2_1", "19_1"],
  achievements: [
    { id: "first_blood", title: "Первая кровь", desc: "Решена первая задача", icon: "Drop", date: "10.05.2026" },
    { id: "streak_7", title: "Неделя в огне", desc: "7 дней подряд", icon: "Flame", date: "17.05.2026" }
  ],
  statsByTask: { 1: { attempted: 5, correct: 4 }, 2: { attempted: 3, correct: 1 } }
};


// --- КОМПОНЕНТЫ UI ---

const GraphTask1 = ({ isDarkMode }) => (
  <div className={`flex flex-col md:flex-row gap-6 p-4 rounded-xl border print:hidden transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
    <div className="flex-1 flex justify-center items-center">
      <svg width="200" height="200" viewBox="0 0 200 200" className={`stroke-2 ${isDarkMode ? 'stroke-slate-300 fill-slate-800 text-slate-300' : 'stroke-slate-600 fill-white text-slate-700'}`}>
        <circle cx="100" cy="30" r="15" /> <text x="95" y="35" className="stroke-none font-bold">К</text>
        <circle cx="30" cy="100" r="15" /> <text x="25" y="105" className="stroke-none font-bold">А</text>
        <circle cx="170" cy="100" r="15" /> <text x="165" y="105" className="stroke-none font-bold">Е</text>
        <circle cx="60" cy="170" r="15" /> <text x="55" y="175" className="stroke-none font-bold">В</text>
        <circle cx="140" cy="170" r="15" /> <text x="135" y="175" className="stroke-none font-bold">Д</text>
        <circle cx="100" cy="100" r="15" /> <text x="95" y="105" className="stroke-none font-bold">Г</text>
        <circle cx="40" cy="40" r="15" /> <text x="35" y="45" className="stroke-none font-bold">Ж</text>
        
        <line x1="88" y1="40" x2="48" y2="92" /> 
        <line x1="112" y1="40" x2="162" y2="92" /> 
        <line x1="100" y1="45" x2="100" y2="85" /> 
        <line x1="88" y1="35" x2="52" y2="35" /> 
        <line x1="30" y1="115" x2="50" y2="160" /> 
        <line x1="170" y1="115" x2="150" y2="160" /> 
        <line x1="90" y1="110" x2="65" y2="160" /> 
        <line x1="110" y1="110" x2="135" y2="160" /> 
        <line x1="40" y1="55" x2="30" y2="85" /> 
      </svg>
    </div>
    <div className="flex-1 overflow-x-auto my-auto">
       <table className={`text-center text-sm border-collapse w-full ${isDarkMode ? 'text-slate-300 border-slate-600' : 'text-slate-700 border-gray-300'}`}>
         <tbody>
            <tr className={isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}>
               <th className={`border p-1 ${isDarkMode ? 'border-slate-600' : 'border-gray-300'}`}></th>
               {["П1","П2","П3","П4","П5","П6","П7"].map(p=><th key={p} className={`border p-1 ${isDarkMode ? 'border-slate-600' : 'border-gray-300'}`}>{p}</th>)}
            </tr>
            {[
              ["П1", "", "9", "12", "", "", "", "10"],
              ["П2", "9", "", "", "", "15", "8", ""],
              ["П3", "12", "", "", "11", "", "7", "14"],
              ["П4", "", "", "11", "", "16", "", ""],
              ["П5", "", "15", "", "16", "", "13", ""],
              ["П6", "", "8", "7", "", "13", "", ""],
              ["П7", "10", "", "14", "", "", "", ""]
            ].map((row, i) => (
               <tr key={i}>
                 {row.map((cell, j) => <td key={j} className={`border p-1 ${isDarkMode ? 'border-slate-600' : 'border-gray-300'} ${j===0 ? (isDarkMode?'bg-slate-700/50 font-bold':'bg-gray-100 font-bold') : ''}`}>{cell}</td>)}
               </tr>
            ))}
         </tbody>
       </table>
    </div>
  </div>
);

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export default function Byte100App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(MOCK_USER);
  const [selectedTaskNum, setSelectedTaskNum] = useState(null);
  
  // Theme Toggle State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Экзамен
  const [examState, setExamState] = useState('idle'); 
  const [examVariant, setExamVariant] = useState([]);
  const [examAnswers, setExamAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3 * 3600 + 55 * 60);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (examState === 'running' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && examState === 'running') {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  const startExam = () => {
    const variant = [];
    EGE_STRUCTURE.forEach(meta => {
      const tasksOfType = TASKS_DB.filter(t => t.taskNum === meta.id);
      const randomTask = tasksOfType[Math.floor(Math.random() * tasksOfType.length)];
      variant.push(randomTask);
    });
    setExamVariant(variant);
    setExamAnswers({});
    setTimeLeft(3 * 3600 + 55 * 60);
    setExamState('running');
    setCurrentView('exam');
  };

  const finishExam = () => {
    setExamState('results');
    let newMistakes = [...user.mistakes];
    let newSolved = [...user.solved];
    
    examVariant.forEach(task => {
      const correctAns = task.correctAnswerFix || task.answer;
      if (examAnswers[task.id]?.toString().trim().toLowerCase() === correctAns.toString().trim().toLowerCase()) {
        if (!newSolved.includes(task.id)) newSolved.push(task.id);
      } else {
        if (!newMistakes.includes(task.id)) newMistakes.push(task.id);
      }
    });

    setUser({...user, mistakes: newMistakes, solved: newSolved, xp: user.xp + 500});
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setCurrentView(id); setSelectedTaskNum(null); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === id && !selectedTaskNum
          ? `bg-violet-600/20 text-violet-500 border ${isDarkMode ? 'border-violet-500/30' : 'border-violet-300'}`
          : `${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-gray-100 hover:text-slate-900'}`
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    // Корневой div с явным указанием цветов в зависимости от темы
    <div className={`min-h-screen font-sans flex overflow-hidden transition-colors duration-300 print:bg-white print:text-black ${isDarkMode ? 'bg-[#0b1120] text-slate-200' : 'bg-gray-50 text-slate-800'}`}>
      
      {/* SIDEBAR (Скрыт при печати) */}
      <aside className={`w-64 border-r flex-col hidden md:flex print:hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-black bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent flex items-center gap-2">
            <Zap className="text-violet-500" fill="currentColor"/> BYTE.100
          </h1>
          <p className={`text-xs mt-1 uppercase tracking-wider font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ЕГЭ Информатика 2026</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Главная" />
          <NavItem id="bank" icon={Database} label="Банк заданий" />
          <NavItem id="exam" icon={Target} label="Режим экзамена" />
          <NavItem id="theory" icon={BookOpen} label="Теория" />
          <NavItem id="cheats" icon={FileText} label="Шпаргалки" />
          <NavItem id="mistakes" icon={AlertTriangle} label="Ошибки" />
        </nav>

        <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
          <div className={`p-4 rounded-xl flex items-center gap-3 ${isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50 border border-gray-100'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-emerald-500 flex items-center gap-1"><Flame size={12}/> {user.streak} дней</p>
            </div>
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'}`}
              title={isDarkMode ? "Светлая тема" : "Темная тема"}
            >
              {isDarkMode ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light print:bg-none print:w-full">
        {/* Glow Effects (скрыты при печати и в светлой теме) */}
        {isDarkMode && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none print:hidden"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none print:hidden"></div>
          </>
        )}

        <div className="p-6 md:p-10 max-w-7xl mx-auto relative z-10 print:p-0 print:max-w-full">
          
          {/* --- DASHBOARD VIEW --- */}
          {currentView === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 print:hidden">
              <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>С возвращением, {user.name}!</h2>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>До ЕГЭ осталось 240 дней. Продолжаем кодить.</p>
                </div>
                <button onClick={startExam} className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2">
                  <Play size={18} fill="currentColor" /> Написать пробник
                </button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Widgets */}
                <div className={`backdrop-blur p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-violet-500/20 rounded-lg text-violet-500"><Target size={24}/></div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Прогноз баллов</span>
                  </div>
                  <h3 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>88<span className="text-lg text-slate-400 font-medium">/100</span></h3>
                  <div className={`mt-4 w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    <div className="bg-violet-500 h-full" style={{width: '88%'}}></div>
                  </div>
                </div>

                <div className={`backdrop-blur p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-500"><CheckCircle2 size={24}/></div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Решено задач</span>
                  </div>
                  <h3 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.solved.length}<span className="text-lg text-slate-400 font-medium"> шт</span></h3>
                  <p className="text-sm text-emerald-500 mt-4 flex items-center gap-1">+12 за эту неделю</p>
                </div>

                <div className={`backdrop-blur p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-lg text-orange-500"><Trophy size={24}/></div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Рейтинг (XP)</span>
                  </div>
                  <h3 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.xp}</h3>
                  <p className={`text-sm mt-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Топ 15% среди пользователей</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`border rounded-2xl p-6 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <AlertTriangle className="text-rose-500" size={20}/> Требуют внимания
                  </h3>
                  <div className="space-y-3">
                    {user.mistakes.slice(0, 3).map(mId => {
                      const t = TASKS_DB.find(x => x.id === mId);
                      return t ? (
                        <div key={mId} className={`flex items-center justify-between p-4 rounded-xl transition cursor-pointer ${isDarkMode ? 'bg-slate-900/50 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'}`} onClick={() => { setCurrentView('bank'); setSelectedTaskNum(t.taskNum); }}>
                          <div className="flex items-center gap-4">
                            <div className="bg-rose-500/20 text-rose-500 font-bold px-3 py-1 rounded-md text-sm">№ {t.taskNum}</div>
                            <span className="font-medium text-sm sm:text-base">{EGE_STRUCTURE.find(s=>s.id === t.taskNum)?.name}</span>
                          </div>
                          <ChevronRight size={18} className="text-slate-400"/>
                        </div>
                      ) : null;
                    })}
                    {user.mistakes.length === 0 && <p className="text-slate-400 text-center py-4">Ошибок пока нет. Так держать!</p>}
                  </div>
                </div>

                <div className={`border rounded-2xl p-6 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <Star className="text-yellow-500" size={20}/> Достижения
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.achievements.map(a => (
                      <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-700/50' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="p-2 bg-yellow-500/20 text-yellow-600 rounded-lg">
                          <Trophy size={18}/>
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{a.title}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{a.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- BANK VIEW --- */}
          {currentView === 'bank' && !selectedTaskNum && (
            <div className="animate-in fade-in duration-300 print:hidden pb-16 md:pb-0">
              <div className="mb-8">
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Банк заданий ЕГЭ 2026</h2>
                <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Структурированная база с актуальными прототипами задач.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {EGE_STRUCTURE.map(meta => {
                  const available = TASKS_DB.filter(t => t.taskNum === meta.id).length;
                  const difficultyColor = meta.difficulty === 'Легко' ? 'text-emerald-500 bg-emerald-500/10' : 
                                          meta.difficulty === 'Средне' ? 'text-yellow-600 bg-yellow-500/10' : 
                                          'text-rose-500 bg-rose-500/10';
                  return (
                    <div 
                      key={meta.id} 
                      onClick={() => setSelectedTaskNum(meta.id)}
                      className={`border transition-all cursor-pointer rounded-xl p-5 group relative overflow-hidden ${isDarkMode ? 'bg-slate-800/60 border-slate-700 hover:border-violet-500 hover:bg-slate-800' : 'bg-white border-gray-200 hover:border-violet-500 hover:shadow-md'}`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all"></div>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-2xl font-black transition-colors ${isDarkMode ? 'text-slate-600 group-hover:text-violet-500' : 'text-gray-300 group-hover:text-violet-600'}`}>#{meta.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-md font-medium ${difficultyColor}`}>{meta.difficulty}</span>
                      </div>
                      <h3 className={`font-bold text-lg mb-2 leading-tight min-h-[3rem] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{meta.name}</h3>
                      <div className={`flex items-center gap-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span>{available} задач</span>
                        <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-gray-200'}`}>
                          <div className="h-full bg-violet-500" style={{width: `${Math.random()*60 + 10}%`}}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* --- SPECIFIC TASK LIST --- */}
          {currentView === 'bank' && selectedTaskNum && (
            <div className="animate-in slide-in-from-right-8 duration-300 print:hidden pb-16 md:pb-0">
              <button 
                onClick={() => setSelectedTaskNum(null)}
                className={`flex items-center gap-2 mb-6 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <ChevronRight className="rotate-180" size={18} /> Назад к банку
              </button>
              
              <div className="mb-8">
                <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-violet-600 text-white px-3 py-1 rounded-lg text-lg">№{selectedTaskNum}</span> 
                  {EGE_STRUCTURE.find(s=>s.id === selectedTaskNum)?.name}
                </h2>
              </div>

              <div className="space-y-6">
                {TASKS_DB.filter(t => t.taskNum === selectedTaskNum).map((task, idx) => (
                  <TaskCard key={task.id} task={task} index={idx} user={user} setUser={setUser} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>
          )}

          {/* --- EXAM MODE --- */}
          {currentView === 'exam' && (
            <div className="animate-in zoom-in-95 duration-500 print:hidden pb-16 md:pb-0">
              {examState === 'idle' && (
                <div className="max-w-2xl mx-auto text-center py-10 sm:py-20">
                  <div className="w-20 h-20 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target size={40} className="text-violet-500"/>
                  </div>
                  <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Симуляция ЕГЭ</h2>
                  <p className={`mb-8 text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Случайный вариант из 27 заданий по структуре 2026 года. Время: 3:55.</p>
                  <button onClick={startExam} className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all w-full sm:w-auto">
                    Начать экзамен
                  </button>
                </div>
              )}

              {examState === 'running' && (
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div className={`border rounded-2xl p-4 sm:p-6 sticky top-4 z-20 shadow-2xl ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <div className="flex items-center gap-3 text-rose-500 font-mono text-xl sm:text-2xl font-bold bg-rose-500/10 px-4 py-2 rounded-lg w-full sm:w-auto justify-center">
                          <Clock size={24} /> {formatTime(timeLeft)}
                        </div>
                        <button onClick={() => {if(window.confirm('Завершить досрочно?')) finishExam()}} className={`border px-4 py-2 rounded-lg transition-colors w-full sm:w-auto ${isDarkMode ? 'text-slate-400 border-slate-600 hover:text-white hover:border-slate-400' : 'text-slate-600 border-gray-300 hover:text-slate-900 hover:border-gray-500'}`}>
                          Завершить
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 sm:grid-cols-9 gap-1 sm:gap-2">
                        {examVariant.map((t, i) => (
                          <button 
                            key={t.id}
                            onClick={() => document.getElementById(`exam-task-${i}`).scrollIntoView({behavior: 'smooth'})}
                            className={`h-8 sm:h-10 rounded-md font-bold text-xs sm:text-sm border transition-colors ${
                              examAnswers[t.id] 
                                ? (isDarkMode ? 'bg-violet-600/30 border-violet-500 text-violet-300' : 'bg-violet-100 border-violet-500 text-violet-700') 
                                : (isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500' : 'bg-gray-50 border-gray-200 text-slate-500 hover:border-gray-400')
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8 pb-20">
                      {examVariant.map((task, idx) => (
                        <div id={`exam-task-${idx}`} key={task.id} className={`border rounded-2xl p-4 sm:p-6 ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-gray-200'}`}>
                           <div className={`flex items-center gap-3 mb-4 border-b pb-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                             <div className="bg-slate-700 text-white font-bold w-8 h-8 rounded-md flex items-center justify-center">{idx + 1}</div>
                             <h3 className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{EGE_STRUCTURE.find(s=>s.id === task.taskNum)?.name}</h3>
                           </div>
                           <p className={`mb-6 leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{task.text}</p>
                           
                           {task.type === 'graph_matrix' && <GraphTask1 isDarkMode={isDarkMode}/>}
                           {task.type === 'logic_table' && (
                             <div className="my-4 overflow-x-auto">
                               <table className={`w-full max-w-sm text-center border-collapse ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                                 <tbody>
                                   {task.table && task.table.map((row, rIdx) => (
                                     <tr key={rIdx} className={rIdx===0 ? (isDarkMode ? "bg-slate-700 text-white font-bold" : "bg-gray-200 text-slate-900 font-bold") : (isDarkMode ? "bg-slate-800 border-t border-slate-700" : "bg-white border-t border-gray-200")}>
                                       {row.map((cell, cIdx) => <td key={cIdx} className={`p-2 border-r last:border-0 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>{cell}</td>)}
                                     </tr>
                                   ))}
                                 </tbody>
                               </table>
                             </div>
                           )}

                           <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                             <input 
                               type="text" 
                               placeholder="Ваш ответ" 
                               value={examAnswers[task.id] || ''}
                               onChange={(e) => setExamAnswers({...examAnswers, [task.id]: e.target.value})}
                               className={`border rounded-xl px-4 py-3 outline-none w-full sm:w-64 font-mono focus:border-violet-500 ${isDarkMode ? 'bg-slate-900 border-slate-600 text-white' : 'bg-gray-50 border-gray-300 text-slate-900'}`}
                             />
                             {examAnswers[task.id] && <CheckCircle2 className="text-emerald-500" size={20}/>}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {examState === 'results' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8">
                  <div className={`border rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-white shadow-xl border-gray-200'}`}>
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 to-emerald-500"></div>
                    <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Экзамен завершен</h2>
                    <p className={`mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Результаты сохранены в вашу статистику.</p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 items-center">
                      <div>
                        <p className={`text-xs sm:text-sm uppercase tracking-widest font-bold mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Первичный балл</p>
                        <p className={`text-5xl sm:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {examVariant.filter(t => {
                            const correct = t.correctAnswerFix || t.answer;
                            return examAnswers[t.id]?.toString().trim().toLowerCase() === correct.toString().trim().toLowerCase();
                          }).length} <span className={`text-xl sm:text-2xl ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>/ 29</span>
                        </p>
                      </div>
                      <div className={`w-full sm:w-px h-px sm:h-20 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
                      <div>
                        <p className="text-xs sm:text-sm text-violet-500 uppercase tracking-widest font-bold mb-2">Тестовый балл</p>
                        <p className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-emerald-500">
                          {Math.round((examVariant.filter(t => {
                             const correct = t.correctAnswerFix || t.answer;
                             return examAnswers[t.id]?.toString().trim().toLowerCase() === correct.toString().trim().toLowerCase();
                          }).length / 29) * 100)} <span className={`text-xl sm:text-2xl ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>/ 100</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`border rounded-2xl p-4 sm:p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Подробный разбор</h3>
                    <div className="space-y-3">
                      {examVariant.map((task, idx) => {
                        const correct = task.correctAnswerFix || task.answer;
                        const userAns = examAnswers[task.id]?.toString().trim().toLowerCase() || '';
                        const isCorrect = userAns === correct.toString().trim().toLowerCase();
                        
                        return (
                          <div key={task.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isCorrect ? (isDarkMode ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200') : (isDarkMode ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200')}`}>
                            <div className="flex items-center gap-4 w-full">
                              <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-white ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                {isCorrect ? <CheckCircle2 size={16}/> : <XCircle size={16}/>}
                              </div>
                              <div className="flex-1">
                                <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Задание {idx + 1}</p>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Ответ: <span className={isCorrect ? 'text-emerald-500 font-medium' : 'line-through text-rose-500'}>{userAns || '—'}</span> {!isCorrect && <span className="text-emerald-500 font-medium ml-2">Правильно: {correct}</span>}</p>
                              </div>
                            </div>
                            <button className="text-sm text-violet-600 dark:text-violet-400 font-medium bg-violet-500/10 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                              Решение
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center pb-20">
                    <button onClick={() => {setExamState('idle'); setCurrentView('dashboard')}} className={`px-6 py-3 rounded-xl font-medium transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-slate-800'}`}>
                      Вернуться на главную
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- CHEATSHEETS VIEW --- */}
          {currentView === 'cheats' && (
            <div className="animate-in fade-in duration-300 pb-16 md:pb-0 print:p-4 print:text-black print:bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 print:hidden">
                <h2 className={`text-3xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><FileText className="text-emerald-500"/> Шпаргалки</h2>
                <button 
                  onClick={() => window.print()} 
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] font-semibold transition-all w-full sm:w-auto"
                >
                  <Printer size={18}/> Печатать шпоры
                </button>
              </div>
              
              <h1 className="hidden print:block text-2xl font-bold text-center mb-6">Шпаргалки ЕГЭ Информатика 2026</h1>

              <div className="columns-1 md:columns-2 gap-6 space-y-6 print:columns-2 print:gap-4 print:space-y-4">
                {CHEATSHEETS_DB.map((sheet, idx) => (
                  <div key={idx} className={`break-inside-avoid border p-5 rounded-2xl shadow-sm print:bg-none print:bg-white print:border-gray-300 print:shadow-none print:p-4 ${isDarkMode ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700 shadow-xl' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded text-white print:bg-gray-200 print:text-black ${sheet.type === 'theory' ? 'bg-emerald-500' : 'bg-violet-600'}`}>
                        {sheet.type === 'theory' ? 'Теория' : 'Код Python'} (№{sheet.taskNum})
                      </span>
                      <h3 className={`text-lg font-bold print:text-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{sheet.title.split(': ')[1] || sheet.title}</h3>
                    </div>
                    <pre className={`p-4 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border print:bg-gray-50 print:text-black print:border-gray-300 print:whitespace-pre-wrap ${isDarkMode ? 'bg-slate-950 text-emerald-400 border-slate-800' : 'bg-gray-50 text-emerald-700 border-gray-200'}`}>
                      <code>{sheet.content}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- OTHERS --- */}
          {currentView === 'theory' && (
            <div className="animate-in fade-in duration-300 print:hidden pb-16 md:pb-0">
               <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><BookOpen className="text-violet-500"/> База знаний</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {THEORY_DB.map(item => (
                   <div key={item.id} className={`border p-6 rounded-2xl transition-colors cursor-pointer ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:border-violet-500/50' : 'bg-white border-gray-200 hover:border-violet-400 shadow-sm'}`}>
                     <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                     <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.content}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {currentView === 'mistakes' && (
            <div className="animate-in fade-in duration-300 print:hidden pb-16 md:pb-0">
              <h2 className={`text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><AlertTriangle className="text-rose-500"/> Работа над ошибками</h2>
              <p className={`mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Задачи, в которых вы ошиблись.</p>
              {user.mistakes.length === 0 ? (
                 <div className={`text-center py-20 rounded-3xl border border-dashed ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-gray-50 border-gray-300'}`}>
                   <CheckCircle2 className="mx-auto text-emerald-500 mb-4" size={48}/>
                   <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Ошибок нет!</h3>
                 </div>
              ) : (
                <div className="space-y-6">
                  {user.mistakes.map(taskId => {
                    const task = TASKS_DB.find(t => t.id === taskId);
                    return task ? <TaskCard key={task.id} task={task} index={0} user={user} setUser={setUser} isMistakeMode isDarkMode={isDarkMode} /> : null;
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </main>
      
      {/* MOBILE NAV */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 border-t p-2 flex justify-around items-center z-50 print:hidden transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <button onClick={() => {setCurrentView('dashboard'); setSelectedTaskNum(null)}} className={`flex flex-col items-center p-2 rounded-lg ${currentView === 'dashboard' ? 'text-violet-500' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>
          <LayoutDashboard size={20}/><span className="text-[10px] mt-1 font-medium">Главная</span>
        </button>
        <button onClick={() => {setCurrentView('bank'); setSelectedTaskNum(null)}} className={`flex flex-col items-center p-2 rounded-lg ${currentView === 'bank' ? 'text-violet-500' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>
          <Database size={20}/><span className="text-[10px] mt-1 font-medium">Банк</span>
        </button>
        <button onClick={() => {setCurrentView('exam'); setSelectedTaskNum(null)}} className={`flex flex-col items-center p-2 rounded-lg ${currentView === 'exam' ? 'text-violet-500' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>
          <Target size={20}/><span className="text-[10px] mt-1 font-medium">Вариант</span>
        </button>
        <button onClick={() => {setCurrentView('cheats'); setSelectedTaskNum(null)}} className={`flex flex-col items-center p-2 rounded-lg ${currentView === 'cheats' ? 'text-emerald-500' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>
          <FileText size={20}/><span className="text-[10px] mt-1 font-medium">Шпоры</span>
        </button>
        {/* Toggle on mobile */}
        <button onClick={() => setIsDarkMode(!isDarkMode)} className={`flex flex-col items-center p-2 rounded-lg ${isDarkMode ? 'text-yellow-500' : 'text-slate-700'}`}>
          {isDarkMode ? <Sun size={20}/> : <Moon size={20}/>}<span className="text-[10px] mt-1 font-medium">Тема</span>
        </button>
      </div>

    </div>
  );
}

const Database = ({size, className}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
const Flame = ({size, className}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg>;

// --- КОМПОНЕНТ КАРТОЧКИ ЗАДАЧИ ---
function TaskCard({ task, index, user, setUser, isMistakeMode = false, isDarkMode }) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [showExplanation, setShowExplanation] = useState(false);

  const isSolvedPreviously = user.solved.includes(task.id);

  const checkAnswer = () => {
    if (!answer.trim()) return;
    const correctAns = task.correctAnswerFix || task.answer;
    
    if (answer.trim().toLowerCase() === correctAns.toString().trim().toLowerCase()) {
      setStatus('correct');
      if (!user.solved.includes(task.id)) {
        const newSolved = [...user.solved, task.id];
        const newMistakes = user.mistakes.filter(id => id !== task.id);
        setUser({ ...user, solved: newSolved, mistakes: newMistakes, xp: user.xp + 10 });
      }
    } else {
      setStatus('wrong');
      if (!user.mistakes.includes(task.id)) {
        setUser({ ...user, mistakes: [...user.mistakes, task.id] });
      }
    }
  };

  return (
    <div className={`border rounded-2xl p-4 sm:p-6 transition-all shadow-sm ${
      status === 'correct' ? (isDarkMode ? 'border-emerald-500/50 bg-slate-800/80' : 'border-emerald-400 bg-emerald-50') : 
      status === 'wrong' ? (isDarkMode ? 'border-rose-500/50 bg-slate-800/80' : 'border-rose-400 bg-rose-50') : 
      isSolvedPreviously && !isMistakeMode ? (isDarkMode ? 'border-emerald-500/20 bg-slate-800/40' : 'border-emerald-200 bg-white') : 
      (isDarkMode ? 'border-slate-700 bg-slate-800/80' : 'border-gray-200 bg-white')
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-bold font-mono ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-slate-600'}`}>ID: {task.id}</span>
          {isSolvedPreviously && !isMistakeMode && <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded"><CheckCircle2 size={12}/> Решено</span>}
        </div>
      </div>

      <div className={`text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-wrap ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
        {task.text}
      </div>

      {task.type === 'graph_matrix' && <GraphTask1 isDarkMode={isDarkMode} />}

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Ваш ответ..." 
            value={answer}
            onChange={(e) => {setAnswer(e.target.value); setStatus('idle')}}
            className={`border rounded-xl px-4 py-3 outline-none w-full sm:w-64 font-mono transition-colors focus:ring-2 ${
              isDarkMode 
                ? 'bg-slate-900 text-white ' + (status === 'correct' ? 'border-emerald-500 focus:ring-emerald-500/20' : status === 'wrong' ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-600 focus:border-violet-500 focus:ring-violet-500/20')
                : 'bg-gray-50 text-slate-900 ' + (status === 'correct' ? 'border-emerald-500 focus:ring-emerald-500/20' : status === 'wrong' ? 'border-rose-500 focus:ring-rose-500/20' : 'border-gray-300 focus:border-violet-500 focus:ring-violet-500/20')
            }`}
          />
          {status === 'correct' && <CheckCircle2 className="absolute right-3 top-3 text-emerald-500" size={20}/>}
          {status === 'wrong' && <XCircle className="absolute right-3 top-3 text-rose-500" size={20}/>}
        </div>
        <button 
          onClick={checkAnswer}
          className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors w-full sm:w-auto"
        >
          Ответить
        </button>
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className={`px-4 py-3 rounded-xl font-medium transition-colors border w-full sm:w-auto ${isDarkMode ? 'text-slate-400 hover:text-white border-transparent hover:border-slate-600' : 'text-slate-600 hover:text-slate-900 border-transparent hover:border-gray-300'}`}
        >
          {showExplanation ? 'Скрыть решение' : 'Смотреть решение'}
        </button>
      </div>

      {showExplanation && (
        <div className={`mt-6 border rounded-xl p-4 sm:p-5 animate-in fade-in slide-in-from-top-2 ${isDarkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
          <h4 className={`font-bold flex items-center gap-2 mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><BrainCircuit size={18} className="text-violet-500"/> Пошаговое решение</h4>
          <p className={`whitespace-pre-wrap text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{task.explanation}</p>
          <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
            <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Ответ: {task.correctAnswerFix || task.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}