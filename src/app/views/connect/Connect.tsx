import { useNavigate } from "react-router-dom";
import { useWallet } from "../../apis/Wallet";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import useInput from "../../hooks/useInput";
import { Paths } from "../../router";

export default function Connect() {
  const navigate = useNavigate();

  const phrase = useInput(
    "govern best true bachelor achieve return slush duck armed course"
  );

  const password = useInput("sports");

  const wallet = useWallet();

  const onClickConnect = () => {
    wallet
      .connect(phrase.value, password.value)
      .then(() => {
        navigate(Paths.Home);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="py-8 px-6">
      <div className="flex flex-col gap-4">
        <TextField
          label="LND Pairing Phrase"
          placeholder="Phrase"
          value={phrase.value}
          onChange={phrase.onChange}
        />
        <TextField
          placeholder="Password"
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <div className="mt-8">
        <Button onClick={onClickConnect}>Connect</Button>
      </div>
    </div>
  );
}
