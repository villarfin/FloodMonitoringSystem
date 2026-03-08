import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { monitoredWaters } from "../data/monitoredWaters";

export function IncidentReportScreen() {
  const [reporterName, setReporterName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [locationId, setLocationId] = useState(monitoredWaters[0]?.id ?? "");
  const [waterLevel, setWaterLevel] = useState("");
  const [incidentType, setIncidentType] = useState("Flood");
  const [urgency, setUrgency] = useState("Medium");
  const [needsRescue, setNeedsRescue] = useState(false);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [reportDate, setReportDate] = useState("");
  const [reportTime, setReportTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedLocation = monitoredWaters.find((item) => item.id === locationId);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Incident Report</Text>
      <Text style={styles.pageText}>
        Submit an incident report for floods or tsunami-related observations.
      </Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Reporter Name (Text)</Text>
        <TextInput
          style={styles.input}
          value={reporterName}
          onChangeText={setReporterName}
          placeholder="Juan Dela Cruz"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Email (Email)</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="name@email.com"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contact Number (Tel)</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="09XXXXXXXXX"
          placeholderTextColor="#94a3b8"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Monitored Location (Select)</Text>
        <View style={styles.optionWrap}>
          {monitoredWaters.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.optionChip, locationId === item.id && styles.optionChipActive]}
              onPress={() => setLocationId(item.id)}
            >
              <Text style={[styles.optionChipText, locationId === item.id && styles.optionChipTextActive]}>
                {item.locationName}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Observed Water Level in Meters (Number)</Text>
        <TextInput
          style={styles.input}
          value={waterLevel}
          onChangeText={setWaterLevel}
          placeholder="e.g. 7.5"
          placeholderTextColor="#94a3b8"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Incident Type (Select)</Text>
        <View style={styles.optionWrap}>
          {["Flood", "Tsunami Warning", "Heavy Rainfall", "Landslide Risk"].map((item) => (
            <Pressable
              key={item}
              style={[styles.optionChip, incidentType === item && styles.optionChipActive]}
              onPress={() => setIncidentType(item)}
            >
              <Text style={[styles.optionChipText, incidentType === item && styles.optionChipTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Urgency (Radio)</Text>
        <View style={styles.optionWrap}>
          {["Low", "Medium", "High"].map((item) => (
            <Pressable
              key={item}
              style={[styles.optionChip, urgency === item && styles.optionChipActive]}
              onPress={() => setUrgency(item)}
            >
              <Text style={[styles.optionChipText, urgency === item && styles.optionChipTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Follow-up Preferences (Checkbox)</Text>
        {[
          [needsRescue, setNeedsRescue, "Needs rescue assistance"],
          [notifySms, setNotifySms, "Notify by SMS"],
          [notifyEmail, setNotifyEmail, "Notify by Email"],
        ].map(([value, setter, label]) => (
          <Pressable key={label} style={styles.checkboxRow} onPress={() => setter((current) => !current)}>
            <View style={[styles.checkbox, value && styles.checkboxActive]}>
              {value ? <Text style={styles.checkboxMark}>X</Text> : null}
            </View>
            <Text style={styles.checkboxLabel}>{label}</Text>
          </Pressable>
        ))}

        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <Text style={styles.label}>Report Date (Date)</Text>
            <TextInput
              style={styles.input}
              value={reportDate}
              onChangeText={setReportDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#94a3b8"
            />
          </View>
          <View style={styles.dateField}>
            <Text style={styles.label}>Report Time (Time)</Text>
            <TextInput
              style={styles.input}
              value={reportTime}
              onChangeText={setReportTime}
              placeholder="HH:MM"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        <Text style={styles.label}>Incident Notes (Textarea)</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Describe what is happening in the area..."
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <Pressable style={styles.submitButton} onPress={() => setSubmitted(true)}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </Pressable>
      </View>

      {submitted ? (
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Submitted Report Preview</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Reporter:</Text> {reporterName}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Email:</Text> {email}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Contact:</Text> {contactNumber}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Location:</Text> {selectedLocation?.locationName}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Observed Water Level:</Text> {waterLevel}m</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Incident Type:</Text> {incidentType}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Urgency:</Text> {urgency}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Needs Rescue:</Text> {needsRescue ? "Yes" : "No"}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Notify SMS:</Text> {notifySms ? "Yes" : "No"}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Notify Email:</Text> {notifyEmail ? "Yes" : "No"}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Date/Time:</Text> {reportDate} {reportTime}</Text>
          <Text style={styles.previewText}><Text style={styles.previewStrong}>Notes:</Text> {notes}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  title: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  pageText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 14,
  },
  label: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
    marginTop: 6,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#0f172a",
    fontSize: 14,
    marginBottom: 8,
  },
  optionWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  optionChip: {
    backgroundColor: "#e2e8f0",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  optionChipActive: {
    backgroundColor: "#0ea5e9",
  },
  optionChipText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  optionChipTextActive: {
    color: "#ffffff",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: "#0ea5e9",
    borderColor: "#0ea5e9",
  },
  checkboxMark: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },
  checkboxLabel: {
    color: "#334155",
    fontSize: 14,
  },
  dateRow: {
    flexDirection: "row",
    gap: 10,
  },
  dateField: {
    flex: 1,
  },
  textarea: {
    height: 120,
  },
  submitButton: {
    backgroundColor: "#0ea5e9",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  previewCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  previewTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  previewText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  previewStrong: {
    fontWeight: "800",
    color: "#0f172a",
  },
});
