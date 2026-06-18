import { EditAttachmentGroupFormData } from 'agreements/agreement/vedlegg/EditAttachmentGroupModal'
import { EditAgreementFormDataDto } from 'utils/zodSchema/editAgreement'

import { AgreementAttachment, AgreementRegistrationDTO, MediaInfo } from './types/response-types'

export const getEditedAgreementDTOAddFiles = (
  agreementToEdit: AgreementRegistrationDTO,
  attachmentIdToEdit: string,
  files: MediaInfo[]
): AgreementRegistrationDTO => {
  const indexOfAttachmentToEdit = agreementToEdit.agreementData.attachments.findIndex(
    (attachment) => attachment.id === attachmentIdToEdit
  )
  const attachmentToEdit: AgreementAttachment = {
    ...agreementToEdit.agreementData.attachments[indexOfAttachmentToEdit],
  }

  attachmentToEdit.media = attachmentToEdit.media.concat(files)

  const oldAndNewAttachments = agreementToEdit.agreementData.attachments.map((attachment) => {
    return attachment.id === attachmentIdToEdit ? attachmentToEdit : attachment
  })

  return {
    ...agreementToEdit,
    agreementData: {
      ...agreementToEdit.agreementData,
      attachments: oldAndNewAttachments,
    },
  }
}

export const getEditedAgreementDTOchangeTextOnFile = (
  agreementToEdit: AgreementRegistrationDTO,
  attachmentIdToEdit: string,
  uri: string,
  editedText: string
): AgreementRegistrationDTO => {
  const indexOfAttachmentToEdit = agreementToEdit.agreementData.attachments.findIndex(
    (attachment) => attachment.id === attachmentIdToEdit
  )

  if (indexOfAttachmentToEdit !== -1) {
    const attachmentToEdit: AgreementAttachment = agreementToEdit.agreementData.attachments[indexOfAttachmentToEdit]
    const mediaIndex = attachmentToEdit.media.findIndex((media) => media.uri === uri)
    if (mediaIndex !== -1) {
      attachmentToEdit.media[mediaIndex].text = editedText
    }
  }

  return agreementToEdit
}
export const getEditedAgreementDTORemoveFiles = (
  agreementToEdit: AgreementRegistrationDTO,
  attachmentIdToEdit: string,
  fileToRemoveUri: string
): AgreementRegistrationDTO => {
  const indexOfAttachmentToEdit = agreementToEdit.agreementData.attachments.findIndex(
    (attachment) => attachment.id === attachmentIdToEdit
  )
  const attachmentToEdit: AgreementAttachment = {
    ...agreementToEdit.agreementData.attachments[indexOfAttachmentToEdit],
  }

  attachmentToEdit.media = attachmentToEdit.media.filter((file) => file.uri !== fileToRemoveUri)

  const oldAndNewAttachments = agreementToEdit.agreementData.attachments.map((attachment) => {
    return attachment.id === attachmentIdToEdit ? attachmentToEdit : attachment
  })

  return {
    ...agreementToEdit,
    agreementData: {
      ...agreementToEdit.agreementData,
      attachments: oldAndNewAttachments,
    },
  }
}

export const getEditedAgreementDTO = (
  agreementToEdit: AgreementRegistrationDTO,
  newDescription: string
): AgreementRegistrationDTO => {
  return {
    ...agreementToEdit,
    agreementData: {
      ...agreementToEdit.agreementData,
      text: newDescription,
    },
  }
}

export const getEditedAgreementWithNewAttachmentGroupInfo = (
  agreementToEdit: AgreementRegistrationDTO,
  attachmentId: string,
  editedInfo: EditAttachmentGroupFormData
): AgreementRegistrationDTO => {
  const indexOfAttachmentToUpdate = agreementToEdit.agreementData.attachments.findIndex(
    (attachment) => attachment.id === attachmentId
  )
  const attachmentToUpdate = agreementToEdit.agreementData.attachments[indexOfAttachmentToUpdate]
  agreementToEdit.agreementData.attachments[indexOfAttachmentToUpdate] = {
    id: attachmentToUpdate.id,
    title: editedInfo.tittel,
    description: editedInfo.beskrivelse,
    media: attachmentToUpdate.media,
  }

  return agreementToEdit
}

export const getEditedAgreementWithNewInfoDTO = (
  agreementToEdit: AgreementRegistrationDTO,
  editedInfo: EditAgreementFormDataDto
): AgreementRegistrationDTO => {
  return {
    ...agreementToEdit,
    title: editedInfo.agreementName,
    published: editedInfo.avtaleperiodeStart,
    expired: editedInfo.avtaleperiodeSlutt,
    reference: editedInfo.anbudsnummer,
    previousAgreement: editedInfo.previousAgreement,
  }
}

export const getAgreeementWithNewAttachmentGroup = (
  agreementToEdit: AgreementRegistrationDTO,
  newAttachment: AgreementAttachment
): AgreementRegistrationDTO => {
  const updatedAttachments = [...agreementToEdit.agreementData.attachments, newAttachment]

  return {
    ...agreementToEdit,
    agreementData: {
      ...agreementToEdit.agreementData,
      attachments: updatedAttachments,
    },
  }
}

export const getAgreeementWithoutDeletedAttachmentDTO = (
  agreementToEdit: AgreementRegistrationDTO,
  attachmentId: string
): AgreementRegistrationDTO => {
  const updatedAttachments = agreementToEdit.agreementData.attachments.filter(
    (attachment) => attachment.id !== attachmentId
  )

  return {
    ...agreementToEdit,
    agreementData: {
      ...agreementToEdit.agreementData,
      attachments: updatedAttachments,
    },
  }
}
