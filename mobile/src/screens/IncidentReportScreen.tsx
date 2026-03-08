import { useState } from "react";
import { Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import { monitoredWaters } from "../data/monitoredWaters";
import { styles } from "../styles/pages/IncidentReportScreen.styles";

type Urgency = "Low" | "Medium" | "High";

export function IncidentReportScreen() {
  const [reporterName, setReporterName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [locationId, setLocationId] = useState(monitoredWaters[0]?.id ?? "");
  const [waterLevel, setWaterLevel] = useState("");
  const [incidentType, setIncidentType] = useState("Flood");
  const [urgency, setUrgency] = useState<Urgency>("Medium");
  const [needsRescue, setNeedsRescue] = useState(false);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [reportDate, setReportDate] = useState("");
  const [reportTime, setReportTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedLocation = monitoredWaters.find((item) => item.id === locationId);

  return (
    <ScreenLayout title="Incident Report" subtitle="Submit floods or tsunami-related observations.">
      <ScrollView nestedScrollEnabled>
        <LabeledInput label="Reporter Name (Text)" value={reporterName} onChangeText={setReporterName} placeholder="Juan Dela Cruz" />
        <LabeledInput label="Email (Email)" value={email} onChangeText={setEmail} placeholder="name@email.com" keyboardType="email-address" />
        <LabeledInput label="Contact Number (Tel)" value={contactNumber} onChangeText={setContactNumber} placeholder="09XXXXXXXXX" keyboardType="phone-pad" />
        <LabeledInput label="Observed Water Level in Meters (Number)" value={waterLevel} onChangeText={setWaterLevel} placeholder="e.g. 7.5" keyboardType="decimal-pad" />
        <LabeledInput label="Report Date (Date)" value={reportDate} onChangeText={setReportDate} placeholder="YYYY-MM-DD" />
        <LabeledInput label="Report Time (Time)" value={reportTime} onChangeText={setReportTime} placeholder="HH:MM" />

        <Text style={styles.fieldLabel}>Monitored Location</Text>
        <HorizontalChoices
          options={monitoredWaters.map((item) => ({ label: item.locationName, value: item.id }))}
          value={locationId}
          onChange={setLocationId}
        />

        <Text style={styles.fieldLabel}>Incident Type</Text>
        <HorizontalChoices
          options={["Flood", "Tsunami Warning", "Heavy Rainfall", "Landslide Risk"].map((value) => ({ label: value, value }))}
          value={incidentType}
          onChange={setIncidentType}
        />

        <Text style={styles.fieldLabel}>Urgency (Radio)</Text>
        <HorizontalChoices
          options={["Low", "Medium", "High"].map((value) => ({ label: value, value }))}
          value={urgency}
          onChange={(value) => setUrgency(value as Urgency)}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Needs rescue assistance</Text>
          <Switch value={needsRescue} onValueChange={setNeedsRescue} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notify by SMS</Text>
          <Switch value={notifySms} onValueChange={setNotifySms} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notify by Email</Text>
          <Switch value={notifyEmail} onValueChange={setNotifyEmail} />
        </View>

        <Text style={styles.fieldLabel}>Incident Notes (Textarea)</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Describe what is happening in the area..."
          placeholderTextColor="#64748b"
          style={[styles.input, styles.textArea]}
          multiline
        />

        <Pressable style={styles.submit} onPress={() => setSubmitted(true)}>
          <Text style={styles.submitText}>Submit Report</Text>
        </Pressable>

        {submitted ? (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>Submitted Report Preview</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Reporter:</Text> {reporterName}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Email:</Text> {email}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Contact:</Text> {contactNumber}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Location:</Text> {selectedLocation?.locationName}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Observed Water Level:</Text> {waterLevel}m</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Incident Type:</Text> {incidentType}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Urgency:</Text> {urgency}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Needs Rescue:</Text> {needsRescue ? "Yes" : "No"}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Notify SMS:</Text> {notifySms ? "Yes" : "No"}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Notify Email:</Text> {notifyEmail ? "Yes" : "No"}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Date/Time:</Text> {reportDate} {reportTime}</Text>
            <Text style={styles.previewText}><Text style={styles.bold}>Notes:</Text> {notes}</Text>
          </View>
        ) : null}
      </ScrollView>
    </ScreenLayout>
  );
}

interface LabeledInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "decimal-pad";
}

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: LabeledInputProps) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

interface HorizontalChoicesProps {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}

function HorizontalChoices({ options, value, onChange }: HorizontalChoicesProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.choicesWrap}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.choice, isActive && styles.choiceActive]}
          >
            <Text style={[styles.choiceText, isActive && styles.choiceTextActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
