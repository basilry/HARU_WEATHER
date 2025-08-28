<template>
  <div class="feedback-page">
    <div class="container">
      <!-- 헤더 섹션 -->
      <header class="page-header">
        <h1 class="page-title">💬 피드백</h1>
        <p class="page-subtitle">
          HARU WEATHER에 대한 의견이나 건의사항을 남겨주세요. 
          여러분의 소중한 피드백이 더 나은 서비스를 만듭니다.
        </p>
      </header>

      <!-- 피드백 양식 -->
      <section class="content-section">
        <div class="section-header">
          <h2>📝 피드백 보내기</h2>
        </div>
        
        <div class="content-card">
          <form @submit.prevent="submitFeedback" class="feedback-form">
            <!-- 피드백 유형 -->
            <div class="form-group">
              <label for="feedbackType" class="form-label">피드백 유형</label>
              <select 
                id="feedbackType" 
                v-model="feedback.type" 
                class="form-select"
                required
              >
                <option value="">유형을 선택해주세요</option>
                <option value="bug">🐛 버그 신고</option>
                <option value="feature">✨ 기능 제안</option>
                <option value="improvement">🔧 개선 사항</option>
                <option value="compliment">👏 칭찬</option>
                <option value="question">❓ 문의사항</option>
                <option value="other">📋 기타</option>
              </select>
            </div>

            <!-- 제목 -->
            <div class="form-group">
              <label for="feedbackTitle" class="form-label">제목</label>
              <input 
                id="feedbackTitle"
                type="text" 
                v-model="feedback.title" 
                class="form-input"
                placeholder="피드백 제목을 입력해주세요"
                required
                maxlength="100"
              />
              <div class="char-count">{{ feedback.title.length }}/100</div>
            </div>

            <!-- 내용 -->
            <div class="form-group">
              <label for="feedbackContent" class="form-label">내용</label>
              <textarea 
                id="feedbackContent"
                v-model="feedback.content" 
                class="form-textarea"
                placeholder="자세한 내용을 입력해주세요&#10;&#10;버그 신고의 경우:&#10;- 발생 상황과 재현 방법을 상세히 설명해주세요&#10;- 사용 중인 브라우저와 디바이스 정보를 포함해주세요&#10;&#10;기능 제안의 경우:&#10;- 제안하시는 기능과 그 이유를 설명해주세요&#10;- 예상되는 사용 시나리오를 포함해주세요"
                required
                rows="8"
                maxlength="1000"
              ></textarea>
              <div class="char-count">{{ feedback.content.length }}/1000</div>
            </div>

            <!-- 이메일 (선택사항) -->
            <div class="form-group">
              <label for="feedbackEmail" class="form-label">
                이메일 (선택사항)
                <span class="form-note">답변을 받고 싶으시면 이메일을 입력해주세요</span>
              </label>
              <input 
                id="feedbackEmail"
                type="email" 
                v-model="feedback.email" 
                class="form-input"
                placeholder="your.email@example.com"
              />
            </div>

            <!-- 브라우저 정보 -->
            <div class="form-group">
              <label class="form-label">브라우저 정보 (자동 수집)</label>
              <div class="browser-info">
                <div class="info-item">
                  <strong>브라우저:</strong> {{ browserInfo.browser }}
                </div>
                <div class="info-item">
                  <strong>버전:</strong> {{ browserInfo.version }}
                </div>
                <div class="info-item">
                  <strong>OS:</strong> {{ browserInfo.os }}
                </div>
                <div class="info-item">
                  <strong>화면 해상도:</strong> {{ browserInfo.screenResolution }}
                </div>
              </div>
            </div>

            <!-- 제출 버튼 -->
            <div class="form-actions">
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isSubmitting || !isFormValid"
              >
                <span v-if="isSubmitting" class="loading-spinner"></span>
                {{ isSubmitting ? '전송 중...' : '피드백 보내기' }}
              </button>
              <button 
                type="button" 
                @click="resetForm" 
                class="btn btn-secondary"
                :disabled="isSubmitting"
              >
                초기화
              </button>
            </div>
          </form>

          <!-- 제출 완료 메시지 -->
          <div v-if="showSuccessMessage" class="success-message">
            <div class="success-icon">✅</div>
            <h3>피드백이 성공적으로 전송되었습니다!</h3>
            <p>소중한 의견 감사합니다. 검토 후 필요시 답변드리겠습니다.</p>
            <button @click="resetForm" class="btn btn-secondary">새 피드백 작성</button>
          </div>
        </div>
      </section>

      <!-- 기타 연락 방법 -->
      <section class="content-section">
        <div class="section-header">
          <h2>📞 기타 연락 방법</h2>
        </div>
        
        <div class="content-card">
          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <h3>이메일</h3>
              <p>직접 이메일로 연락하고 싶으시다면</p>
              <a href="mailto:basilry@gmail.com" class="contact-link">
                basilry@gmail.com
              </a>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">💻</div>
              <h3>GitHub</h3>
              <p>버그 신고나 기능 제안을 GitHub Issues로</p>
              <a href="https://github.com/basilry" target="_blank" rel="noopener noreferrer" class="contact-link">
                GitHub 프로필
              </a>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">💼</div>
              <h3>LinkedIn</h3>
              <p>전문적인 문의나 협업 제안</p>
              <a href="https://www.linkedin.com/in/basilry" target="_blank" rel="noopener noreferrer" class="contact-link">
                LinkedIn 프로필
              </a>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">📝</div>
              <h3>개인 블로그</h3>
              <p>개발 관련 글과 프로젝트 소개</p>
              <a href="https://basilry.kim" target="_blank" rel="noopener noreferrer" class="contact-link">
                개인 블로그
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="content-section">
        <div class="section-header">
          <h2>❓ 자주 묻는 질문</h2>
        </div>
        
        <div class="content-card">
          <div class="faq-list">
            <div class="faq-item">
              <h4>Q. 피드백에 대한 답변은 언제 받을 수 있나요?</h4>
              <p>
                이메일을 남겨주신 경우, 영업일 기준 3-5일 내에 답변드립니다. 
                복잡한 기술적 문제의 경우 더 오래 걸릴 수 있습니다.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Q. 제안한 기능이 실제로 개발되나요?</h4>
              <p>
                모든 제안을 검토하지만, 기술적 제약이나 프로젝트 방향성에 따라 
                모든 기능이 구현되지는 않을 수 있습니다. 하지만 좋은 아이디어는 적극 반영하려 노력합니다.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Q. 개인정보는 어떻게 처리되나요?</h4>
              <p>
                제공해주신 이메일과 피드백 내용은 답변 목적으로만 사용되며, 
                제3자에게 공유되지 않습니다. 답변 완료 후 일정 기간 후 삭제됩니다.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Q. 버그를 신고할 때 어떤 정보를 포함해야 하나요?</h4>
              <p>
                발생 상황, 재현 방법, 사용 중인 브라우저와 OS, 오류 메시지(있다면) 등을 
                포함해 주시면 문제 해결에 큰 도움이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Feedback',
  setup() {
    const feedback = ref({
      type: '',
      title: '',
      content: '',
      email: ''
    })
    
    const browserInfo = ref({
      browser: '',
      version: '',
      os: '',
      screenResolution: ''
    })
    
    const isSubmitting = ref(false)
    const showSuccessMessage = ref(false)
    
    // 폼 유효성 검사
    const isFormValid = computed(() => {
      return feedback.value.type && 
             feedback.value.title.trim() && 
             feedback.value.content.trim()
    })
    
    // 브라우저 정보 수집
    const getBrowserInfo = () => {
      const ua = navigator.userAgent
      let browser = 'Unknown'
      let version = 'Unknown'
      let os = 'Unknown'
      
      // 브라우저 감지
      if (ua.includes('Chrome')) {
        browser = 'Chrome'
        version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown'
      } else if (ua.includes('Firefox')) {
        browser = 'Firefox'
        version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown'
      } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari'
        version = ua.match(/Safari\/([0-9.]+)/)?.[1] || 'Unknown'
      } else if (ua.includes('Edge')) {
        browser = 'Edge'
        version = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown'
      }
      
      // OS 감지
      if (ua.includes('Windows')) {
        os = 'Windows'
      } else if (ua.includes('Mac')) {
        os = 'macOS'
      } else if (ua.includes('Linux')) {
        os = 'Linux'
      } else if (ua.includes('Android')) {
        os = 'Android'
      } else if (ua.includes('iPhone') || ua.includes('iPad')) {
        os = 'iOS'
      }
      
      browserInfo.value = {
        browser,
        version,
        os,
        screenResolution: `${screen.width}x${screen.height}`
      }
    }
    
    // 피드백 제출
    const submitFeedback = async () => {
      if (!isFormValid.value) return
      
      isSubmitting.value = true
      
      try {
        // 실제 서버로 전송하는 로직을 여기에 구현
        // 현재는 시뮬레이션을 위한 딜레이
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 콘솔에 피드백 정보 출력 (개발용)
        console.log('피드백 제출:', {
          ...feedback.value,
          browserInfo: browserInfo.value,
          timestamp: new Date().toISOString()
        })
        
        showSuccessMessage.value = true
      } catch (error) {
        console.error('피드백 제출 실패:', error)
        alert('피드백 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      } finally {
        isSubmitting.value = false
      }
    }
    
    // 폼 초기화
    const resetForm = () => {
      feedback.value = {
        type: '',
        title: '',
        content: '',
        email: ''
      }
      showSuccessMessage.value = false
    }
    
    onMounted(() => {
      getBrowserInfo()
    })
    
    return {
      feedback,
      browserInfo,
      isSubmitting,
      showSuccessMessage,
      isFormValid,
      submitFeedback,
      resetForm
    }
  }
}
</script>

<style lang="scss" scoped>
.feedback-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  
  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .page-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  
  .section-header {
    margin-bottom: 1.5rem;
    
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--text-color);
      margin: 0;
    }
  }
}

.content-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.feedback-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .form-label {
    display: block;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    
    .form-note {
      font-weight: 400;
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-left: 0.5rem;
    }
  }
  
  .form-select, .form-input, .form-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 1rem;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &::placeholder {
      color: var(--text-secondary);
    }
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
  }
  
  .char-count {
    text-align: right;
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }
}

.browser-info {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
    
    &:last-child {
      margin-bottom: 0;
    }
    
    strong {
      color: var(--text-color);
      min-width: 80px;
    }
  }
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &.btn-primary {
    background: var(--primary-color);
    color: white;
    
    &:hover:not(:disabled) {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }
  }
  
  &.btn-secondary {
    background: var(--secondary-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    
    &:hover:not(:disabled) {
      background: var(--hover-bg);
    }
  }
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.success-message {
  text-align: center;
  padding: 2rem;
  
  .success-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: var(--primary-color);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.contact-item {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .contact-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: var(--text-color);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.faq-list {
  .faq-item {
    margin-bottom: 2rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h4 {
      color: var(--primary-color);
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }
    
    p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }
  }
}
</style>
