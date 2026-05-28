import styles from './calculator.module.css';

export default function CalculatorLoading() {
  return (
    <div className="container section">
      <div style={{ marginBottom: '2rem' }}>
        <div className="skeleton" style={{ width: '120px', height: '24px', marginBottom: '1rem', borderRadius: '4px' }}></div>
        <div className="skeleton" style={{ width: '60%', height: '40px', marginBottom: '1rem', borderRadius: '8px' }}></div>
        <div className="skeleton" style={{ width: '80%', height: '20px', borderRadius: '4px' }}></div>
      </div>
      
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <div className="skeleton" style={{ width: '40%', height: '28px', marginBottom: '2rem', borderRadius: '6px' }}></div>
          
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div className="skeleton" style={{ width: '30%', height: '16px', borderRadius: '4px' }}></div>
                <div className="skeleton" style={{ width: '20%', height: '24px', borderRadius: '12px' }}></div>
              </div>
              <div className="skeleton" style={{ width: '100%', height: '6px', borderRadius: '3px' }}></div>
            </div>
          ))}
        </div>
        
        <div className={styles.resultPanel}>
          <div className="skeleton" style={{ width: '100%', height: '120px', borderRadius: '12px', marginBottom: '1.5rem' }}></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton" style={{ width: '100%', height: '80px', borderRadius: '8px' }}></div>
            ))}
          </div>
          
          <div className="skeleton" style={{ width: '100%', height: '220px', borderRadius: '12px', margin: '0 auto' }}></div>
        </div>
      </div>
    </div>
  );
}
