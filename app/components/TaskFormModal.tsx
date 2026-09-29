import React, { useState, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { Task, TaskStatus, TaskPriority, CreateTaskInput } from '../types';

interface TaskFormModalProps {
  visible: boolean;
  editingTask?: Task | null;
  onClose: () => void;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const PRIORITY_OPTIONS: { value: TaskPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: '#10B981' },
  { value: 'medium', label: 'Medium', color: '#F59E0B' },
  { value: 'high', label: 'High', color: '#EF4444' },
];

/**
 * Re-render this component with a fresh key whenever editingTask/visible changes
 * so all useState values are re-initialized from props — avoids calling setState
 * inside useEffect (react-hooks/set-state-in-effect rule).
 */
function TaskFormModalInner({ visible, editingTask, onClose, onSubmit }: TaskFormModalProps) {
  const [title, setTitle] = useState(editingTask?.title ?? '');
  const [description, setDescription] = useState(editingTask?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(editingTask?.status ?? 'todo');
  const [priority, setPriority] = useState<TaskPriority>(editingTask?.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ?? '');
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState('');

  const handleSubmit = useCallback(async () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setTitleError('');
    setLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate: dueDate.trim() || null,
        teamId: null,
        assigneeId: null,
      });
      onClose();
    } catch {
      Alert.alert('Error', 'Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [title, description, status, priority, dueDate, onSubmit, onClose]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {editingTask ? '✏️ Edit Task' : '➕ New Task'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} accessibilityLabel="Close form">
              <MaterialIcons name="close" size={22} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={[styles.input, titleError ? styles.inputError : null]}
              placeholder="Enter task title..."
              placeholderTextColor="#4B5563"
              value={title}
              onChangeText={(t) => { setTitle(t); setTitleError(''); }}
              maxLength={100}
              accessibilityLabel="Task title input"
            />
            {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add a description..."
              placeholderTextColor="#4B5563"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              accessibilityLabel="Task description input"
            />

            {/* Status */}
            <Text style={styles.label}>Status</Text>
            <View style={styles.optionsRow}>
              {STATUS_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.optionChip, status === opt.value && styles.optionChipActive]}
                  onPress={() => setStatus(opt.value)}
                  accessibilityLabel={`Set status to ${opt.label}`}
                >
                  <Text style={[styles.optionChipText, status === opt.value && styles.optionChipTextActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Priority */}
            <Text style={styles.label}>Priority</Text>
            <View style={styles.optionsRow}>
              {PRIORITY_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.optionChip,
                    priority === opt.value && { backgroundColor: opt.color + '33', borderColor: opt.color },
                  ]}
                  onPress={() => setPriority(opt.value)}
                  accessibilityLabel={`Set priority to ${opt.label}`}
                >
                  <Text style={[styles.optionChipText, priority === opt.value && { color: opt.color }]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Due Date */}
            <Text style={styles.label}>Due Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD (e.g. 2026-12-31)"
              placeholderTextColor="#4B5563"
              value={dueDate}
              onChangeText={setDueDate}
              accessibilityLabel="Task due date input"
            />

            {/* Submit */}
            <TouchableOpacity
              style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={loading}
              accessibilityLabel={editingTask ? 'Update task' : 'Create task'}
            >
              <Text style={styles.submitBtnText}>
                {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/**
 * Wrapper that changes the key whenever editingTask or visible changes,
 * forcing TaskFormModalInner to fully re-mount with fresh state.
 */
export function TaskFormModal(props: TaskFormModalProps) {
  const key = `${props.editingTask?.id ?? 'new'}-${props.visible}`;
  return <TaskFormModalInner key={key} {...props} />;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000088',
  },
  sheet: {
    backgroundColor: '#13131F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F1F5F9',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E1E2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D42',
    color: '#F1F5F9',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D2D42',
    backgroundColor: '#1E1E2E',
  },
  optionChipActive: {
    backgroundColor: '#6C63FF33',
    borderColor: '#6C63FF',
  },
  optionChipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  optionChipTextActive: {
    color: '#6C63FF',
  },
  submitBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
