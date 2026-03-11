document.addEventListener('DOMContentLoaded', () => {
  initSettings();
  initEventListeners();
  fetchGitHubStats();
});

// 初始化设置，从localStorage加载已保存的设置
function initSettings() {
  // 关键词偏好设置
  loadKeywordPreferences();
  // 作者偏好设置
  loadAuthorPreferences();
}

// 从localStorage加载关键词偏好
function loadKeywordPreferences() {
  const selectedKeywordsContainer = document.getElementById('selectedKeywords');
  selectedKeywordsContainer.innerHTML = '';
  
  // 获取保存的关键词，如果没有则使用默认关键词
  let savedKeywords = localStorage.getItem('preferredKeywords');
  let keywords = []; // 默认无关键词
  
  if (savedKeywords) {
    try {
      keywords = JSON.parse(savedKeywords);
    } catch (e) {
      console.error('解析保存的关键词失败:', e);
    }
  }
  
  // 显示保存的关键词
  if (keywords.length > 0) {
    keywords.forEach(keyword => {
      addKeywordTag(keyword);
    });
  } else {
    // 显示空标签消息
    showEmptyTagMessage();
  }
}

// 从localStorage加载作者偏好
function loadAuthorPreferences() {
  const selectedAuthorsContainer = document.getElementById('selectedAuthors');
  selectedAuthorsContainer.innerHTML = '';
  
  // 获取保存的作者，如果没有则为空数组
  let savedAuthors = localStorage.getItem('preferredAuthors');
  let authors = []; // 默认无作者
  
  if (savedAuthors) {
    try {
      authors = JSON.parse(savedAuthors);
    } catch (e) {
      console.error('解析保存的作者失败:', e);
    }
  }
  
  // 显示保存的作者
  if (authors.length > 0) {
    authors.forEach(author => {
      addAuthorTag(author);
    });
  } else {
    // 显示空标签消息
    showEmptyAuthorMessage();
  }
}

// 显示空标签消息
function showEmptyTagMessage() {
  const selectedKeywordsContainer = document.getElementById('selectedKeywords');
  const emptyMessage = document.createElement('div');
  emptyMessage.id = 'emptyTagMessage';
  emptyMessage.className = 'empty-tag-message';
  emptyMessage.textContent = 'No keywords added yet. Add some keywords below.';
  selectedKeywordsContainer.appendChild(emptyMessage);
}

// 显示空作者标签消息
function showEmptyAuthorMessage() {
  const selectedAuthorsContainer = document.getElementById('selectedAuthors');
  const emptyMessage = document.createElement('div');
  emptyMessage.id = 'emptyAuthorMessage';
  emptyMessage.className = 'empty-tag-message';
  emptyMessage.textContent = 'No authors added yet. Add some authors below.';
  selectedAuthorsContainer.appendChild(emptyMessage);
}

// 隐藏空标签消息
function hideEmptyTagMessage() {
  const emptyMessage = document.getElementById('emptyTagMessage');
  if (emptyMessage) {
    emptyMessage.remove();
  }
}

// 隐藏空作者标签消息
function hideEmptyAuthorMessage() {
  const emptyMessage = document.getElementById('emptyAuthorMessage');
  if (emptyMessage) {
    emptyMessage.remove();
  }
}

// 添加关键词标签
function addKeywordTag(keyword) {
  const selectedKeywordsContainer = document.getElementById('selectedKeywords');
  
  // 移除空标签消息
  hideEmptyTagMessage();
  
  // 检查关键词是否已存在
  const existingTags = selectedKeywordsContainer.querySelectorAll('.category-button');
  for (let i = 0; i < existingTags.length; i++) {
    if (existingTags[i].textContent.trim().startsWith(keyword)) {
      // 已存在该关键词，添加闪烁动画提示用户
      existingTags[i].classList.add('tag-highlight');
      setTimeout(() => {
        existingTags[i].classList.remove('tag-highlight');
      }, 1000);
      return; // 关键词已存在，不添加
    }
  }
  
  // 创建新的关键词标签
  const tagElement = document.createElement('span');
  tagElement.className = 'category-button tag-appear';
  tagElement.innerHTML = `${keyword} <button class="remove-tag">×</button>`;
  
  // 添加删除按钮事件
  const removeButton = tagElement.querySelector('.remove-tag');
  removeButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 添加删除动画
    tagElement.classList.add('tag-disappear');
    
    // 动画结束后移除元素
    setTimeout(() => {
      tagElement.remove();
      
      // 如果没有标签了，显示空标签消息
      if (selectedKeywordsContainer.querySelectorAll('.category-button').length === 0) {
        showEmptyTagMessage();
      }
    }, 300);
  });
  
  selectedKeywordsContainer.appendChild(tagElement);
  
  // 添加出现动画后移除动画类
  setTimeout(() => {
    tagElement.classList.remove('tag-appear');
  }, 300);
}

// 添加作者标签
function addAuthorTag(author) {
  const selectedAuthorsContainer = document.getElementById('selectedAuthors');
  
  // 移除空标签消息
  hideEmptyAuthorMessage();
  
  // 检查作者是否已存在
  const existingTags = selectedAuthorsContainer.querySelectorAll('.category-button');
  for (let i = 0; i < existingTags.length; i++) {
    if (existingTags[i].textContent.trim().startsWith(author)) {
      // 已存在该作者，添加闪烁动画提示用户
      existingTags[i].classList.add('tag-highlight');
      setTimeout(() => {
        existingTags[i].classList.remove('tag-highlight');
      }, 1000);
      return; // 作者已存在，不添加
    }
  }
  
  // 创建新的作者标签
  const tagElement = document.createElement('span');
  tagElement.className = 'category-button tag-appear';
  tagElement.innerHTML = `${author} <button class="remove-tag">×</button>`;
  
  // 添加删除按钮事件
  const removeButton = tagElement.querySelector('.remove-tag');
  removeButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 添加删除动画
    tagElement.classList.add('tag-disappear');
    
    // 动画结束后移除元素
    setTimeout(() => {
      tagElement.remove();
      
      // 如果没有标签了，显示空标签消息
      if (selectedAuthorsContainer.querySelectorAll('.category-button').length === 0) {
        showEmptyAuthorMessage();
      }
    }, 300);
  });
  
  selectedAuthorsContainer.appendChild(tagElement);
  
  // 添加出现动画后移除动画类
  setTimeout(() => {
    tagElement.classList.remove('tag-appear');
  }, 300);
}

// 初始化事件监听器
function initEventListeners() {
  // 关键词添加按钮
  const addKeywordButton = document.getElementById('addKeyword');
  addKeywordButton.addEventListener('click', () => {
    const keywordInput = document.getElementById('keywordInput');
    const keyword = keywordInput.value.trim();
    
    if (keyword) {
      addKeywordTag(keyword);
      keywordInput.value = '';
    }
  });
  
  // 关键词输入框回车事件
  const keywordInput = document.getElementById('keywordInput');
  keywordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const keyword = keywordInput.value.trim();
      
      if (keyword) {
        addKeywordTag(keyword);
        keywordInput.value = '';
      }
    }
  });
  
  // 作者添加按钮
  const addAuthorButton = document.getElementById('addAuthor');
  addAuthorButton.addEventListener('click', () => {
    const authorInput = document.getElementById('authorInput');
    const author = authorInput.value.trim();
    
    if (author) {
      addAuthorTag(author);
      authorInput.value = '';
    }
  });
  
  // 作者输入框回车事件
  const authorInput = document.getElementById('authorInput');
  authorInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const author = authorInput.value.trim();
      
      if (author) {
        addAuthorTag(author);
        authorInput.value = '';
      }
    }
  });
  
  // 保存设置按钮
  const saveSettingsButton = document.getElementById('saveSettings');
  saveSettingsButton.addEventListener('click', saveSettings);
  
  // 重置设置按钮
  const resetSettingsButton = document.getElementById('resetSettings');
  resetSettingsButton.addEventListener('click', resetSettings);
}

// 保存设置
function saveSettings() {
  // 获取所有选中的关键词
  const keywordTags = document.getElementById('selectedKeywords').querySelectorAll('.category-button');
  const keywords = [];
  keywordTags.forEach(tag => {
    const keywordName = tag.textContent.trim().replace('×', '').trim();
    keywords.push(keywordName);
  });
  
  // 获取所有选中的作者
  const authorTags = document.getElementById('selectedAuthors').querySelectorAll('.category-button');
  const authors = [];
  authorTags.forEach(tag => {
    const authorName = tag.textContent.trim().replace('×', '').trim();
    authors.push(authorName);
  });
  
  // 保存设置到localStorage
  localStorage.setItem('preferredKeywords', JSON.stringify(keywords));
  localStorage.setItem('preferredAuthors', JSON.stringify(authors));
  
  // 显示保存成功提示，添加成功图标
  showNotification('Settings saved successfully!', 'success');
}

// 重置设置
function resetSettings() {
  // 重置关键词
  const selectedKeywordsContainer = document.getElementById('selectedKeywords');
  selectedKeywordsContainer.innerHTML = '';
  
  // 重置作者
  const selectedAuthorsContainer = document.getElementById('selectedAuthors');
  selectedAuthorsContainer.innerHTML = '';
  
  // 显示空标签消息
  showEmptyTagMessage();
  showEmptyAuthorMessage();
  
  // 显示重置成功提示
  showNotification('Settings reset to default!', 'info');
}

// 显示通知
function showNotification(message, type = 'success') {
  // 检查是否已存在通知元素
  let notification = document.querySelector('.settings-notification');
  
  if (!notification) {
    // 创建通知元素
    notification = document.createElement('div');
    notification.className = 'settings-notification';
    document.body.appendChild(notification);
  }
  
  // 根据类型设置图标
  let icon = '';
  let bgColor = 'var(--primary-color)';
  
  if (type === 'success') {
    icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/></svg>';
  } else if (type === 'info') {
    icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z" fill="currentColor"/></svg>';
    bgColor = '#3b82f6';
  }
  
  // 设置通知内容和样式
  notification.innerHTML = `${icon}<span>${message}</span>`;
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.style.gap = '8px';
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = bgColor;
  notification.style.color = 'white';
  notification.style.padding = '12px 20px';
  notification.style.borderRadius = 'var(--radius-sm)';
  notification.style.boxShadow = 'var(--shadow-md)';
  notification.style.zIndex = '1000';
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(20px)';
  notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  
  // 显示通知
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // 3秒后隐藏通知
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    
    // 动画结束后移除元素
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// 获取GitHub统计数据
async function fetchGitHubStats() {
  try {
    const response = await fetch('https://api.github.com/repos/huangpipip/daily-arXiv-ai-enhanced');
    const data = await response.json();
    const starCount = data.stargazers_count;
    const forkCount = data.forks_count;

    document.getElementById('starCount').textContent = starCount;
    document.getElementById('forkCount').textContent = forkCount;
  } catch (error) {
    console.error('获取GitHub统计数据失败:', error);
    document.getElementById('starCount').textContent = '?';
    document.getElementById('forkCount').textContent = '?';
  }
}

// 主题切换功能
const ThemeManager = {
  STORAGE_KEY: 'theme',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark'
  },

  init() {
    this.loadTheme();
    this.setupToggle();
  },

  loadTheme() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 默认使用保存的主题，否则根据系统偏好，否则使用亮色主题
    let theme = savedTheme || (prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT);
    this.setTheme(theme);
  },

  setTheme(theme) {
    const isDark = theme === this.THEMES.DARK;
    document.body.classList.toggle('theme-dark', isDark);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateIcon(isDark);
  },

  updateIcon(isDark) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;

    // 月亮图标路径（暗色主题）
    const moonPath = 'M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.55,14.26,19,10.8,19c-5.5,0-10-4.5-10-10 c0-3.46,1.45-6.65,3.84-8.9C5.1,2.13,5.59,2.5,6.03,2.93C2.93,5.08,1,8.3,1,12c0,5.5,4.5,10,10,10c3.7,0,6.92-1.93,8.77-4.84 c0.43,0.44,0.91,0.79,1.47,1.07C19.55,21.45,16.26,23,12.5,23C6.15,23,1,17.85,1,11.5C1,7.74,2.55,4.45,4.93,2.26 c0.28,0.56,0.63,1.04,1.07,1.47C5.08,5.07,5.5,5.1,5.92,5.1C6.7,5.1,7.46,5.26,8.17,5.56C8.54,5.41,8.96,5.51,9.37,5.51z';
    // 太阳图标路径（亮色主题）
    const sunPath = 'M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7z M12,2L9,5l3,3l3-3L12,2z M12,22l3-3l-3-3l-3,3L12,22z M22,12l-3-3l-3,3l3,3L22,12z M2,12l3,3l3-3l-3-3L2,12z M5,9l3-3l-3-3L2,5L5,9z M19,9l3-3l-3-3l-3,3L19,9z M5,15l-3,3l3,3l3-3L5,15z M19,15l-3,3l3,3l3-3L19,15z';

    const path = icon.querySelector('path');
    if (path) {
      path.setAttribute('d', isDark ? sunPath : moonPath);
      // 更新提示文本
      icon.closest('button').setAttribute('title', isDark ? '切换到亮色主题' : '切换到深色主题');
    }
  },

  setupToggle() {
    const toggleButton = document.getElementById('themeToggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        this.setTheme(isDark ? this.THEMES.LIGHT : this.THEMES.DARK);
      });
    }
  }
};

// 初始化主题管理器
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
}); 