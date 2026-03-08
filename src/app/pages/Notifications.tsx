import { useMemo, useState } from "react";
import "../styles/pages/Notifications.css";

type NotificationType = "Tsunami" | "Flood" | "Rainfall";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  isRead: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Tsunami Sensor Spike",
    message: "Offshore buoy detected unusual pressure change.",
    type: "Tsunami",
    time: "08:31",
    isRead: false,
  },
  {
    id: "n2",
    title: "River Level Warning",
    message: "Cagayan De Oro River reached warning threshold.",
    type: "Flood",
    time: "08:12",
    isRead: false,
  },
  {
    id: "n3",
    title: "Heavy Rainfall Forecast",
    message: "Weather system predicts intense rain in 2 hours.",
    type: "Rainfall",
    time: "07:55",
    isRead: true,
  },
];

export function Notifications() {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [filterType, setFilterType] = useState<"All" | NotificationType>("All");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const typeOk = filterType === "All" || item.type === filterType;
      const unreadOk = !showUnreadOnly || !item.isRead;
      return typeOk && unreadOk;
    });
  }, [items, filterType, showUnreadOnly]);

  const unreadCount = items.filter((item) => !item.isRead).length;

  const toggleRead = (id: string) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, isRead: !item.isRead } : item,
      ),
    );
  };

  const markAllAsRead = () => {
    setItems((previous) => previous.map((item) => ({ ...item, isRead: true })));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <section className="app__section">
      <h2 className="app__section-title">Notifications Center</h2>
      <p className="app__page-text">
        Manage tsunami/flood alerts and mark updates as read/unread.
      </p>

      <div className="app__notif-toolbar">
        <label className="app__form-field">
          <span>Filter Type</span>
          <select
            value={filterType}
            onChange={(event) =>
              setFilterType(event.target.value as "All" | NotificationType)
            }
          >
            <option value="All">All</option>
            <option value="Tsunami">Tsunami</option>
            <option value="Flood">Flood</option>
            <option value="Rainfall">Rainfall</option>
          </select>
        </label>

        <label className="app__notif-checkbox">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(event) => setShowUnreadOnly(event.target.checked)}
          />
          <span>Unread only</span>
        </label>

        <div className="app__page-actions">
          <button type="button" className="app__page-link app__page-link--button" onClick={markAllAsRead}>
            Mark all as read
          </button>
          <button type="button" className="app__page-link app__page-link--button" onClick={clearAll}>
            Clear all
          </button>
        </div>
      </div>

      <p className="app__page-text">
        Unread notifications: <strong>{unreadCount}</strong>
      </p>

      {filteredItems.length === 0 ? (
        <p className="app__notif-empty">No notifications to show.</p>
      ) : (
        <ul className="app__notif-list">
          {filteredItems.map((item) => (
            <li key={item.id}>
              <article
                className={`app__notif-card ${item.isRead ? "app__notif-card--read" : ""}`}
              >
                <header className="app__notif-header">
                  <h3>{item.title}</h3>
                  <span className="app__notif-time">{item.time}</span>
                </header>
                <p className="app__page-text">{item.message}</p>
                <p className="app__notif-type">{item.type}</p>
                <button
                  type="button"
                  className="app__page-link app__page-link--button"
                  onClick={() => toggleRead(item.id)}
                >
                  {item.isRead ? "Mark as unread" : "Mark as read"}
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}


