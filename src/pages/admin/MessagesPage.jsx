import { useState, useEffect } from 'react';
import { FiMail, FiTrash2, FiClock, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getMessages, deleteMessage } from '../../services/portfolioService';
import styles from './MessagesPage.module.css';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await getMessages();
      if (res.data?.success) {
        setMessages(res.data.data.messages || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await deleteMessage(id);
      toast.success('Message deleted');
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete message');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h1>
            <FiMail className={styles.accent} />
            CLIENT <span className={styles.accent}>INBOX</span>
          </h1>
          <p className={styles.subtitle}>
            Inquiries and communications received from the public portfolio contact form.
          </p>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <p>Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className={styles.emptyState}>
          <FiMail style={{ fontSize: '3rem', color: '#ff0055', marginBottom: 16 }} />
          <h3>No Messages in Inbox</h3>
          <p>Any client inquiries submitted via your live portfolio will appear here.</p>
        </div>
      ) : (
        <div className={styles.messagesList}>
          {messages.map((msg) => (
            <div key={msg._id} className={styles.messageCard}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.senderName}>{msg.name}</div>
                  <div className={styles.senderEmail}>{msg.email}</div>
                </div>
                <div className={styles.dateTag}>
                  {new Date(msg.createdAt).toLocaleDateString()} at{' '}
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {msg.subject && <div className={styles.subjectText}>{msg.subject}</div>}
              <div className={styles.messageBody}>{msg.message}</div>

              <div className={styles.actions}>
                <button onClick={() => handleDelete(msg._id)} className={styles.deleteBtn}>
                  <FiTrash2 /> Delete Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
