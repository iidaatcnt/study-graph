'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Target, TrendingUp, Book, BarChart3, Plus, Github, ExternalLink } from 'lucide-react';
import { format, subDays, startOfYear, endOfYear, eachDayOfInterval, isSameDay } from 'date-fns';

const StudyGraph = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [studyData, setStudyData] = useState({});
  const [newRecord, setNewRecord] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    hours: '',
    subject: '数学',
    note: ''
  });

  // データの読み込み
  useEffect(() => {
    const savedData = typeof window !== 'undefined' ? localStorage.getItem('studyGraphData') : null;
    if (savedData) {
      try {
        setStudyData(JSON.parse(savedData));
      } catch (e) {
        console.error('データの読み込みに失敗しました:', e);
        generateSampleData();
      }
    } else {
      generateSampleData();
    }
  }, []);

  // データの保存
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(studyData).length > 0) {
      localStorage.setItem('studyGraphData', JSON.stringify(studyData));
    }
  }, [studyData]);

  // サンプルデータの生成（初回のみ）
  const generateSampleData = () => {
    const data = {};
    const today = new Date();
    const yearStart = startOfYear(today);
    const days = eachDayOfInterval({ start: yearStart, end: today });
    
    days.forEach(date => {
      // 30%の確率で学習データを生成
      if (Math.random() > 0.7) {
        const dateStr = format(date, 'yyyy-MM-dd');
        const hours = Math.random() * 6 + 0.5; // 0.5-6.5時間
        const subjects = ['数学', 'プログラミング', '英語', '物理', '化学', '歴史', '国語'];
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        
        data[dateStr] = {
          totalHours: parseFloat(hours.toFixed(1)),
          subject: subject,
          note: `${subject}の学習を行いました`,
          sessions: Math.floor(hours / 2) + 1
        };
      }
    });
    
    setStudyData(data);
  };

  // 学習時間に基づく色の強度を計算
  const getIntensity = (hours) => {
    if (!hours || hours === 0) return 0;
    if (hours < 1) return 1;
    if (hours < 2) return 2;
    if (hours < 4) return 3;
    return 4;
  };

  // 年間カレンダーの生成
  const generateYearCalendar = () => {
    const today = new Date();
    const yearStart = startOfYear(today);
    const yearEnd = endOfYear(today);
    const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd });
    
    // 週ごとにグループ化
    const weeks = [];
    let currentWeek = [];
    
    // 年始の曜日に合わせて空のセルを追加
    const startDay = yearStart.getDay();
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }
    
    allDays.forEach(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const data = studyData[dateStr];
      
      currentWeek.push({
        date,
        dateStr,
        data,
        intensity: getIntensity(data?.totalHours),
        isToday: isSameDay(date, today)
      });
      
      // 週末（土曜日）で週を区切る
      if (date.getDay() === 6) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    // 最後の週に残りがあれば追加
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  // 統計データの計算
  const calculateStats = () => {
    const values = Object.values(studyData);
    const totalHours = values.reduce((sum, day) => sum + (day.totalHours || 0), 0);
    const studyDays = values.filter(day => day.totalHours > 0).length;
    const avgHours = studyDays > 0 ? totalHours / studyDays : 0;
    
    // 連続学習日数の計算
    let currentStreak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const checkDate = subDays(today, i);
      const dateStr = format(checkDate, 'yyyy-MM-dd');
      if (studyData[dateStr]?.totalHours > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    return {
      totalHours: Math.round(totalHours * 10) / 10,
      studyDays,
      avgHours: Math.round(avgHours * 10) / 10,
      currentStreak
    };
  };

  // 新しい記録の追加
  const handleAddRecord = () => {
    if (!newRecord.hours || parseFloat(newRecord.hours) <= 0) {
      alert('学習時間を正しく入力してください');
      return;
    }

    const updatedData = {
      ...studyData,
      [newRecord.date]: {
        totalHours: parseFloat(newRecord.hours),
        subject: newRecord.subject,
        note: newRecord.note || `${newRecord.subject}の学習`,
        sessions: Math.floor(parseFloat(newRecord.hours) / 2) + 1
      }
    };

    setStudyData(updatedData);
    setShowAddModal(false);
    setNewRecord({
      date: format(new Date(), 'yyyy-MM-dd'),
      hours: '',
      subject: '数学',
      note: ''
    });
  };

  // データのリセット
  const handleResetData = () => {
    if (confirm('すべての学習データをリセットしますか？この操作は元に戻せません。')) {
      setStudyData({});
      localStorage.removeItem('studyGraphData');
    }
  };

  const stats = calculateStats();
  const weeks = generateYearCalendar();

  const intensityColors = [
    'bg-gray-100 border border-gray-200', // 0時間
    'bg-green-100 border border-green-200', // ~1時間
    'bg-green-300 border border-green-400', // ~2時間
    'bg-green-500 border border-green-600', // ~4時間
    'bg-green-700 border border-green-800'  // 4時間以上
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Book className="text-indigo-600" />
                StudyGraph
              </h1>
              <p className="text-gray-600 mt-1">あなたの学習時間を可視化しよう</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                記録追加
              </button>
              <a
                href="https://github.com/yourusername/study-graph"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">総学習時間</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.totalHours}h</p>
              </div>
              <Clock className="text-indigo-400" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">学習日数</p>
                <p className="text-2xl font-bold text-green-600">{stats.studyDays}日</p>
              </div>
              <Calendar className="text-green-400" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">平均時間/日</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgHours}h</p>
              </div>
              <TrendingUp className="text-orange-400" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">連続学習</p>
                <p className="text-2xl font-bold text-purple-600">{stats.currentStreak}日</p>
              </div>
              <Target className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        {/* 学習カレンダー */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" />
              {new Date().getFullYear()}年 学習カレンダー
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">少</span>
                <div className="flex gap-1">
                  {intensityColors.map((color, index) => (
                    <div key={index} className={`w-3 h-3 rounded-sm ${color}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">多</span>
              </div>
            </div>
          </div>

          {/* カレンダーグリッド */}
          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => {
                    if (!day) {
                      return <div key={`empty-${dayIndex}`} className="w-3 h-3" />;
                    }
                    
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-110 ${
                          intensityColors[day.intensity]
                        } ${
                          selectedDate === day.dateStr ? 'ring-2 ring-indigo-400' : ''
                        } ${
                          day.isToday ? 'ring-2 ring-blue-400' : ''
                        }`}
                        onClick={() => setSelectedDate(day.dateStr)}
                        title={`${format(day.date, 'yyyy年M月d日')}: ${day.data?.totalHours?.toFixed(1) || 0}時間`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* 月ラベル */}
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>1月</span>
            <span>3月</span>
            <span>5月</span>
            <span>7月</span>
            <span>9月</span>
            <span>11月</span>
          </div>
        </div>

        {/* 詳細表示 */}
        {selectedDate && studyData[selectedDate] && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {format(new Date(selectedDate), 'yyyy年M月d日')} の学習記録
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium">学習時間</p>
                <p className="text-2xl font-bold text-blue-800">
                  {studyData[selectedDate].totalHours}時間
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium">学習科目</p>
                <p className="text-lg font-semibold text-green-800">
                  {studyData[selectedDate].subject}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600 font-medium">学習メモ</p>
                <p className="text-sm text-purple-800">
                  {studyData[selectedDate].note || '記録なし'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* データ管理 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">データ管理</h3>
          <div className="flex gap-4">
            <button
              onClick={handleResetData}
              className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              すべてリセット
            </button>
            <button
              onClick={generateSampleData}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              サンプルデータ生成
            </button>
          </div>
        </div>

        {/* 学習記録追加モーダル */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">学習記録を追加</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    日付
                  </label>
                  <input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    学習時間（時間）
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={newRecord.hours}
                    onChange={(e) => setNewRecord({...newRecord, hours: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="例: 2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    学習科目
                  </label>
                  <select 
                    value={newRecord.subject}
                    onChange={(e) => setNewRecord({...newRecord, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="数学">数学</option>
                    <option value="プログラミング">プログラミング</option>
                    <option value="英語">英語</option>
                    <option value="物理">物理</option>
                    <option value="化学">化学</option>
                    <option value="歴史">歴史</option>
                    <option value="国語">国語</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    学習メモ（任意）
                  </label>
                  <textarea
                    value={newRecord.note}
                    onChange={(e) => setNewRecord({...newRecord, note: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="2"
                    placeholder="今日の学習内容..."
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleAddRecord}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  追加
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGraph;