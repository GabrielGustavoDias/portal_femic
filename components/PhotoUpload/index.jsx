import { useState } from "react";
import { Modal, Text } from "@nextui-org/react";

export default function PhotoUpload() {
    const [visible,setVisible] = useState(false);

    return (
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={() => setVisible(false)}>
            <Modal.Header>
            <Text id="modal-title" size={18}>
              Deseja se cadastrar
              <Text size={18}>
                {" "}como:
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col">
                <input type="file" />
            </div>
          </Modal.Body>
        </Modal>
    );
}