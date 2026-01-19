import { Box, Button } from "@mui/material";
import { useState } from 'react';
import {
  Entry,
  EntryType,
  BaseEntryFormTypes,
  NotificationType,
  ConditionalData
} from "../../../../types";
import EntryTypeSelect from "./EntryTypeSelect";
import Header from './Header';
import BaseEntryForm from "./BaseEntryForm";
import Notification from './Notification';
import entryService from '../../../../services/entries.ts';
import { entryTypeValidator } from "../../../../utilities.ts";
import * as z from 'zod';
import ConditionalEntryTypes from "./ConditionalEntryTypes/index.tsx";
import { getHealthCheckRating } from "./utils.tsx";

function EntryForm(
  { setEntryFormVisible,
    patientId, setEntries
  }:
    {
      setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
      patientId: string,
      setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
    }) {
  const [baseEntryFormData, setBaseEntryFormData] = useState<BaseEntryFormTypes>({
    description: "",
    specialist: "",
    date: null,
    diagnosisCodes: [],
    type: EntryType.HEALTHCHECK
  });
  const [conditionalData, setConditionalData] = useState<ConditionalData>({
    healthCheckRatingKey: "Healthy",
    sickLeave: {
      startDate: null,
      endDate: null,
    },
    employerName: "",
    discharge: {
      date: null,
      criteria: ""
    }
  });
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationType, setNotificationType] = useState<NotificationType | undefined>();
  const [notificationMessage, setNotificationMessage] = useState<string | undefined>();

  function setNotificationAndTimeout(message: string, notificationType: NotificationType) {
    setNotificationMessage(message);
    setNotificationType(notificationType);
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let entryOfUnknownType: unknown = {};
    if (baseEntryFormData.type === EntryType.HEALTHCHECK) {
      entryOfUnknownType = { ...baseEntryFormData, ...conditionalData, healthCheckRating: getHealthCheckRating(conditionalData.healthCheckRatingKey) };
    } else {
      entryOfUnknownType = { ...baseEntryFormData, ...conditionalData };
    }
    try {
      const validatedEntry = entryTypeValidator(entryOfUnknownType);
      if (!patientId) {
        throw new Error('no patient id in handleSubmit.');
      }
      entryService.addEntry({ entry: validatedEntry, id: patientId })
        .then((res: unknown) => {
          if (!Array.isArray(res)) {
            throw new Error('Res is not an array.');
          }
          const validatedEntries = res.map(i => entryTypeValidator(i));
          setEntries(validatedEntries);
          setNotificationAndTimeout("Successfully added new entry.", "Good");
        });
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        setNotificationAndTimeout(`${e.issues[0].message}`, "Bad");
        throw new Error(e.issues[0].message);
      }
    }
  }

  return (
    <div>
      {(notificationVisible && notificationMessage && notificationType) &&
        <Notification
          message={notificationMessage}
          type={notificationType} />}
      <Header setEntryFormVisible={setEntryFormVisible} />
      <EntryTypeSelect
        baseEntryFormData={baseEntryFormData}
        setBaseEntryFormData={setBaseEntryFormData} />
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <BaseEntryForm
          baseEntryFormData={baseEntryFormData}
          setBaseEntryFormData={setBaseEntryFormData}
        />
        <ConditionalEntryTypes
          entryType={baseEntryFormData.type}
          conditionalData={conditionalData}
          setConditionalData={setConditionalData}
        />
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </div >
  );
}

export default EntryForm;
